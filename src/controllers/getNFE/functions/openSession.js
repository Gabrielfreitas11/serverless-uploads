const playwright = require("playwright-aws-lambda");

const { mssql } = require("../../../lib/mssql");

const axios = require("axios");

const { request } = require("../../../../common/http");

const { antiRecaptcha } = require("./antiRecaptcha");

const pages = {
  nfe: "https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=resumo&tipoConteudo=7PhJ+gAVw2g=",
  cte: "https://www.cte.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=resumo&tipoConteudo=cktLvUUKqh0=",
};

exports.openSession = async (nfe, cnpj, type) => {
  await mssql.update(2, nfe);

  const browser = await playwright.launchChromium();

  const context = await browser.newContext();

  const page = await context.newPage();

  const closeBrowser = async (error) => {
    if (error) {
      await mssql.update(1, nfe);
    }
    await page.close();
    await context.close();
    await browser.close();
  };

  const openBrowser = async () => {
    await page.goto(pages[type]);
  };

  const handleReloadPage = async () => {
    await page.evaluate(async () => {
      const button = document.getElementById(
        "ctl00_ContentPlaceHolder1_btnLimparHCaptcha"
      );

      await new Promise((resolve) =>
        setTimeout(() => {
          button.click();

          resolve();
        }, 1000)
      );
    });
  };

  const insertKeyNFe = async () => {
    await page.waitForSelector(
      "#ctl00_ContentPlaceHolder1_txtChaveAcessoResumo",
      {
        timeout: 5000,
      }
    );

    const inputElement = await page.$(
      "#ctl00_ContentPlaceHolder1_txtChaveAcessoResumo"
    );

    await page.waitForTimeout(2000);

    await inputElement.type(nfe);
  };

  const validateCaptchaWithToken = async (token) => {
    await page.evaluate(async (gtoken) => {
      const elements = document.getElementsByName("h-captcha-response");

      elements[0].value = gtoken.trim();

      const button = document.getElementById(
        "ctl00_ContentPlaceHolder1_btnConsultarHCaptcha"
      );

      await new Promise((resolve) =>
        setTimeout(() => {
          button.click();

          resolve();
        }, 3000)
      );
    }, token);
  };

  const handleDownloadButton = async (ac) => {
    try {
      await page.waitForSelector("#ctl00_ContentPlaceHolder1_btnDownload", {
        timeout: 5000,
      });

      await page.click("#ctl00_ContentPlaceHolder1_btnDownload");

      await new Promise((resolve) =>
        setTimeout(() => {
          closeBrowser();

          resolve();
        }, 5000)
      );
    } catch (error) {
      console.log(error);
      ac.reportIncorrectHcaptcha()
        .then((success) => console.log("Report to captcha: ", success))
        .catch((error) => console.log("error to report: ", error));
      throw error;
    }
  };

  const setListeners = () => {
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    page.on("request", (request) => {
      if (
        request
          .url()
          .includes("www.nfe.fazenda.gov.br/portal/downloadNFe.aspx") ||
        request.url().includes("www.cte.fazenda.gov.br/portal/downloadCTe.aspx")
      ) {
        console.log(request.url());

        closeBrowser();

        const option = {
          url: `${process.env.LAMBDA_URL}/downloadXML`,
          method: "POST",
          headers: {
            Authorization: "RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg",
          },
          data: {
            url: request.url(),
            key: nfe,
            cnpj,
          },
        };

        request(option)
          .then(() => console.log("Arquivo gerado com sucesso"))
          .catch((error) =>
            console.log("Problemas ao gerar o arquivo: ", error?.response?.data)
          );
      }
    });
  };

  try {
    await openBrowser();

    setListeners();

    await handleReloadPage();

    await insertKeyNFe();

    const { token, ac } = await antiRecaptcha(type);

    if (!token) {
      throw new Error("Não foi possivel completar o recaptcha");
    }

    if (!token.includes("P1_ey")) {
      closeBrowser(true);
    }

    await validateCaptchaWithToken(token);

    // const content = await page.textContent(
    //   '#ctl00_ContentPlaceHolder1_bltMensagensErroHCaptcha',
    //   {
    //     timeout: 1000,
    //     force: true,
    //   },
    // )

    // if (content?.includes(errorText)) {
    // validate = false
    // ac.reportIncorrectHcaptcha()

    // console.log('deu bosta')
    // }

    await handleDownloadButton(ac);
  } catch (error) {
    console.log(error);

    await closeBrowser(true);
    throw new Error(error.message);
  }
};
