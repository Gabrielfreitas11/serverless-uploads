const mssql = require("../../../../common/mssql");

exports.formatStatus = async (CNPJ_Gestor) => {
  try {
    const result = await mssql.getStatusDownload(CNPJ_Gestor);

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
      ).length;

      statusResult.push({
        CNPJ_Contribuinte: x,
        total,
        cte: infoContribuinte.filter((el) => el.tipo.toUpperCase() == "CTE")
          .length,
        nfe: infoContribuinte.filter((el) => el.tipo.toUpperCase() == "NFE")
          .length,
        pendentes,
        sucessos,
        erros,
        percentPendentes: (pendentes / total) * 100,
        percentSucessos: (sucessos / total) * 100,
        percentErros: (erros / total) * 100,
      });
    });

    return statusResult;
  } catch (error) {
    console.log(error);
    return null;
  }
};
