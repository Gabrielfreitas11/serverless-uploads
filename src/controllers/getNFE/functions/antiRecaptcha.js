const ac = require('@antiadmin/anticaptchaofficial')

exports.antiRecaptcha = async (type) => {
  const siteKey = {
    nfe: process.env.SITE_KEY_NFE,
    cte: process.env.SITE_KEY_CTE,
  }

  ac.setAPIKey(process.env.ANTI_CAPTCHA_KEY)

  console.log(siteKey[type])

  const ACtoken = await ac.solveHCaptchaProxyless(
    'https://www.hcaptcha.com/',
    siteKey[type],
  )

  console.log(ACtoken)

  if (!ACtoken) {
    ac.reportIncorrectHcaptcha()
      .then((success) => console.log('Report to captcha: ', success))
      .catch((error) => console.log('error to report: ', error))
  }

  return { token: ACtoken, ac }
}
