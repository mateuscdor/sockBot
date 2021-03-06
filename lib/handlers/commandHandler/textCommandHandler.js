const helpCommand = require('../../../bin/commands/otherCommands/helpCommand');
const covidCommand = require(
  '../../../bin/commands/covidCommand');
const tagAllCommand = require(
  '../../../bin/commands/groupCommands/tagAllCommand');
const addToGroup = require(
  '../../../bin/commands/groupCommands/addToGroup');
const addToBlacklistCommand = require(
  '../../../bin/commands/adminsCommands/addToBlacklistCommand');
const enterGroupCommand = require(
  '../../../bin/commands/adminsCommands/enterGroupCommand');
const removeFromBlacklistCommand = require(
  '../../../bin/commands/adminsCommands/removeFromBlacklist');
const randomNumbers = require(
  '../../../bin/commands/funCommands/randomNumberCommand');
const randomName = require(
  '../../../bin/commands/funCommands/randomNameCommand');
const sentimentCommand = require(
  '../../../bin/commands/funCommands/sentimentCommand');
const weatherCommand = require(
  '../../../bin/commands/funCommands/weatherCommand');
const failsafeCommand = require(
  '../../../bin/commands/otherCommands/failsafeCommand');
const speechToTextCommand = require(
  '../../../bin/commands/funCommands/speechToTextCommand');
const textToSpeechCommand = require(
  '../../../bin/commands/funCommands/textToSpeechCommand');
const gimatriaCommand = require(
  '../../../bin/commands/funCommands/gimatriaCommands');
const stickerCommand = require(
  '../../../bin/commands/stickerCreatorCommands/stickerMediaCommand');
const loveCalculatorCommand = require(
  '../../../bin/commands/funCommands/loveCalculatorCommand');
const whoIsCommand = require(
  '../../../bin/commands/funCommands/whoIsCommand');
const tvScheduleCommand = require('../../../bin/commands/funCommands/tvScheduleCommand');
const wikiCommand = require('../../../bin/commands/funCommands/wikiCommand');
const jokeCommand = require('../../../bin/commands/funCommands/jokeCommand');
const newsCommand = require('../../../bin/commands/funCommands/newsCommand');
const alarmCommand = require(
  '../../../bin/commands/otherCommands/alarmCcommand');
const luckCommand = require('../../../bin/commands/funCommands/luckCommand');
const tipCommand = require('../../../bin/commands/funCommands/tipCommand');
const translateToCommand = require('../../../bin/commands/otherCommands/translateToCommand');
const searchCommand = require('../../../bin/commands/funCommands/searchCommand');
const {surveyCommand, surveyResults} = require('../../../bin/commands/otherCommands/surveyCommand');
const definitionCommand = require('../../../bin/commands/otherCommands/definitionCommand');
const formatCommand = require('../../../bin/commands/funCommands/formatCommand');
const kickCommand = require('../../../bin/commands/adminsCommands/kickCommand');
const addToSafeGroups = require('../../../bin/commands/groupCommands/addToSafeGroups');
const calculateCommand = require('../../../bin/commands/funCommands/calculateCommand');
const BullsAndCows = require('../../../bin/minigames/bullsAndCows');
const Trivia = require('../../../bin/trivia/trivia');
const carCommand = require('../../../bin/commands/funCommands/carCommand');
const deleteCommand = require('../../../bin/commands/otherCommands/deleteCommand');
const permissionCommand = require('../../../bin/commands/otherCommands/permissionCommand');
const deviceCommand = require('../../../bin/commands/otherCommands/deviceCommand');
const schoolCommand = require('../../../bin/commands/otherCommands/schoolCommand');
const BlackJackSingle = require('../../../bin/minigames/blackJackSingle');

/**
 * Redirects command calls to the right command file.
 *
 * @param {proto.IWebMessageInfo} message
 * @param {makeWASocket} socket
 * @param {makeInMemoryStore} store
 * @param {MiniGames} miniGames
 * @return {Promise<void>}
 */
const procCommand = async (message, socket ,store, miniGames) => {
  const messageParts = message.body.split(' ');
  switch (messageParts[0].substr(1)) {
    case '????????':
      await helpCommand(message, socket);
      break;
    case '????????????':
      await covidCommand(message, socket);
      break;
    case '??????????????':
      await miniGames.addGameChat(message.key.remoteJid, Trivia, message, socket);
      break;
    case '????????':
      await tagAllCommand(message, socket);
      break;
    case '????????':
      await randomNumbers(message, socket);
      break;
    case '????':
      await randomName(message, socket);
      break;
    case '??????????':
      await sentimentCommand(message, socket);
      break;
    case '??????????':
      await weatherCommand(message, socket);
      break;
    case '????????':
      await speechToTextCommand(message, socket);
      break;
    case '????????':
      await textToSpeechCommand(message, socket);
      break;
    case '??????????':
      await failsafeCommand(message);
      break;
    case '??????????????':
      await gimatriaCommand(message, socket);
      break;
    case '??????????':
      await stickerCommand(message, socket);
      break;
    case '????????':
      await loveCalculatorCommand(message, socket, store);
      break;
    case '????????':
      await whoIsCommand(message, socket);
      break;
    case '????????':
      await addToBlacklistCommand(message, socket);
      break
    case '??????':
      await removeFromBlacklistCommand(message, socket);
      break;
    case '??????????????':
      await tvScheduleCommand(message, socket);
      break;
    case '??????':
      await socket.sendMessage(message.key.remoteJid, {text: "????????"}, {quoted: message});
      break;
    case '????????':
      await wikiCommand(message, socket);
      break
    case '??????????':
      await jokeCommand(message, socket);
      break;
    case '????????':
      await newsCommand(message, socket);
      break;
    case '??????????':
      await alarmCommand(message, socket);
      break;
    case '??????':
      await luckCommand(message, socket);
      break;
    case '??????':
      await tipCommand(message, socket);
      break;
    case '????????':
      await translateToCommand(message, socket);
      break;
    case '??????':
      await searchCommand(message, socket);
      break;
    case '??????':
      await surveyCommand(message, socket);
      break;
    case '????????????':
      surveyResults(message, socket, store);
      break;
    case '??????????':
      await definitionCommand(message, socket);
      break;
    case '????????':
      await formatCommand(message, socket);
      break;
    case '??????':
      await socket.sendMessage(message.key.remoteJid, {text: 'https://github.com/Schwartzblat/sockBot'}, {quoted: message});
      break;
    case '??????':
      await kickCommand(message, socket);
      break;
    case '??????':
      await addToGroup(message, socket);
      break;
    case '????????':
      await addToSafeGroups(message, socket);
      break;
    case '??????':
      await calculateCommand(message, socket);
      break;
    case '??????_??????????':
      await miniGames.addGameChat(message.key.remoteJid, BullsAndCows, message, socket);
      break;
    case '??????':
      await enterGroupCommand(message, socket);
      break;
    case '????????':
      await carCommand(message, socket);
      break;
    case '??????':
      await deleteCommand(message, socket);
      break;
     case '????????????':
      await permissionCommand(message, socket);
      break;
    // case '??????????':
    //   await testCommand(message, socket);
    //   break;
    case '??????????':
      await deviceCommand(message, socket);
      break;
    case '??????????':
      await schoolCommand(message, socket);
      break;
    case '??????????':
    case '????????\'??':
      await miniGames.addGameChat(message.key.remoteJid, BlackJackSingle, message, socket);
      break;

  }
};

module.exports = procCommand;
