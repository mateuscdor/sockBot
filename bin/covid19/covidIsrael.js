const axios = require('axios');

const requestPayload = JSON.stringify({
  'requests': [
    {
      'id': '0',
      'queryName': 'updatedPatientsOverallStatus',
      'single': false,
      'parameters': {},
    },
    {
      'id': '1',
      'queryName': 'infectedPerDate',
      'single': false,
      'parameters': {},
    },
    {
      'id': '2',
      'queryName': 'sickPatientPerLocation',
      'single': false,
      'parameters': {},
    },
    {
      'id': '4',
      'queryName': 'vaccinated',
      'single': false,
      'parameters': {days:1},
    },
    {
      'id': '5',
      'queryName': 'deadPatientsPerDate',
      'single': false,
      'parameters': {},
    },
    {
      'id': '6',
      'queryName': 'testResultsPerDate',
      'single': false,
      'parameters': {},
    },
  ],
});



const requestOptions = {
  method: 'POST',
  url: 'https://datadashboardapi.health.gov.il/api/queries/_batch',
  data: requestPayload,
  headers: {
    'Host': 'datadashboardapi.health.gov.il',
    'sec-ch-ua': 'Hey There',
    'Content-Type': 'application/json',
    'Content-Length': 81,
  },
};

/**
 * Process covid Israel command.
 *
 * @param {WAMessage} message
 * @param {makeWASocket} sock
 * @return {Promise<void>}
 */
const procCommand = async (message, sock) => {
  const res = await axios.request(requestOptions).
      catch((err) => {});
  if (!res || res.status !== 200) {
    return;
  }

  const covidData = res.data;
  const patientsStatus = covidData[0].data;
  const infectedData = covidData[1].data;
  const patientsLocation= covidData[2].data;
  const vaccinatedData = covidData[3].data;
  const deadPatientsData = covidData[4].data;
  const testResultsData = covidData[5].data;

  const infectedSum = infectedData[infectedData.length - 1]['sum'];
  const activePatients = patientsLocation[0]['amount']+patientsLocation[1]['amount']+patientsLocation[2]['amount'];
  const infectedToday = infectedData[infectedData.length - 1]['amount'];
  const deadToday = deadPatientsData[deadPatientsData.length - 1]['amount'];
  const deadSum = deadPatientsData[deadPatientsData.length - 1]['total'];
  const patientsHardStatus = patientsStatus[0]["amount"]
  const activeBreath = patientsStatus[3]["amount"]
  const recovered = infectedData[infectedData.length - 1]['recovered'];
  const infectedWeekAverage = infectedData[infectedData.length - 1]['avg'];
  const testsToday = testResultsData[testResultsData.length - 1]['amount'];
  const testsPositivePercentageToday = (testResultsData[testResultsData.length -
  1]['positiveAmount'] / testsToday * 100).toPrecision(2);
  // const firstDoseSum = vaccinatedData
  //     [vaccinatedData.length - 1]['vaccinated_cum'];
  // const secondDoseSum = vaccinatedData
  //     [vaccinatedData.length - 1]['vaccinated_seconde_dose_cum'];
  // const thirdDoseSum = vaccinatedData
  //     [vaccinatedData.length - 1]['vaccinated_third_dose_cum'];
  let output = '*?????????? ?????? ????????????:*' + '\n';
  output += infectedSum.toLocaleString() + ' ?????? ?????????????? ???????????? ????????????' + '\n';
  output += activePatients.toLocaleString() + ' ?????????? ????????????' + '\n';
  output += infectedToday.toLocaleString() + ' ?????????? ?????????? ????????' + '\n';
  output += patientsHardStatus.toLocaleString() + ' ?????????? ???????? ??????' + '\n';
  output += deadToday.toLocaleString() + ' ???????? ??????????' + '\n';
  output += deadSum.toLocaleString() + ' ???????? ???????????? ????????????' + '\n';
  output += activeBreath.toLocaleString() + ' ??????????????' + '\n';
  output += recovered.toLocaleString() + ' ?????????????? ????????' + '\n';
  output += infectedWeekAverage.toLocaleString() + ' ?????????? ?????????? ???????????? ??????????' + '\n';
  output += testsToday.toLocaleString() + ' ???????????? ????????' + '\n';
  output += testsPositivePercentageToday + '% ???????????? ??????????????'+'\n';
  output += vaccinatedData[0]["vaccinated_validity_perc"].toLocaleString() + '% ?????????????? ??????????' + '\n';
  output += vaccinatedData[0]["not_vaccinated_perc"].toLocaleString() + '% ???? ??????????????' + '\n';

  await sock.sendMessage(message.key.remoteJid, {text: output}, {quoted: message});
};
module.exports = procCommand;
