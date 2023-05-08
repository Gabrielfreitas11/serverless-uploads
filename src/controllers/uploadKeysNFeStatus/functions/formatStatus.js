const mssql = require("../../../../common/mssql");

exports.formatStatus = async ({ CNPJ_Gestor, CNPJ_Contribuinte }) => {
  try {
    const result = await mssql.getStatusDownload(
      CNPJ_Gestor,
      CNPJ_Contribuinte
    );

    const statusResult = [];
    const contribuintes = [];

    result.forEach((x) => {
      const index = contribuintes.findIndex(
        (el) => el == x.CNPJ_Contribuinte[0]
      );

      if (index == -1) {
        return contribuintes.push(x.CNPJ_Contribuinte[0]);
      }
    });

    contribuintes.forEach((x) => {
      const infoContribuinte = result.filter(
        (el) => el.CNPJ_Contribuinte[0] == x
      );

      const total = infoContribuinte.length;

      const pendentes = infoContribuinte.filter(
        (el) => el.StatusDownload[0] == "1" || el.StatusDownload[0] == "2"
      ).length;

      const sucessos = infoContribuinte.filter(
        (el) => el.StatusDownload[0] == "3"
      ).length;

      const erros = infoContribuinte.filter(
        (el) => el.StatusDownload[0] == "4" || el.StatusDownload[0] == "5"
      );

      statusResult.push({
        CNPJ_Contribuinte: x,
        total,
        cte: infoContribuinte.filter((el) => el.tipo.toUpperCase() == "CTE")
          .length,
        nfe: infoContribuinte.filter((el) => el.tipo.toUpperCase() == "NFE")
          .length,
        pendentes,
        sucessos,
        erros: erros.length,
        percentPendentes: (pendentes / total) * 100,
        percentSucessos: (sucessos / total) * 100,
        percentErros: (erros.length / total) * 100,
        chavesComErro: erros.map((el) => ({
          chave: el.ChaveAcessoDOC,
          status: el.StatusDownload,
          messagem:
            el.StatusDownload == "5"
              ? `CNPJ do certificado digital não tem autorização à essa chave, verificar se a chave pertence ao contribuinte ${x}`
              : "Não foi localizado o certificado para esse contribuinte",
        })),
      });
    });

    return statusResult.length === 0
      ? statusResult
      : {
          CNPJ_Contribuinte,
          total: 0,
          cte: 0,
          nfe: 0,
          pendentes: 0,
          sucessos: 0,
          erros: 0,
          percentPendentes: 0,
          percentSucessos: 0,
          percentErros: 0,
          chavesComErro: [],
        };
  } catch (error) {
    console.log(error);
    return null;
  }
};
