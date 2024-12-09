const player1 = {
  name: 'Mario',
  speed: 4,
  maneuverability: 3,
  power: 3,
  points: 0,
};

const player2 = {
  name: 'Luigi',
  speed: 3,
  maneuverability: 4,
  power: 4,
  points: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = 'RETA';
      break;

    case random < 0.66:
      result = 'CURVA';
      break;

    default:
      result = 'CONFRONTO';
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round < 6; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === 'RETA') {
      totalTestSkill1 = diceResult1 + character1.speed;
      totalTestSkill2 = diceResult2 + character2.speed;

      await logRollResult(
        character1.name,
        'speed',
        diceResult1,
        character1.speed
      );
      await logRollResult(
        character2.name,
        'speed',
        diceResult1,
        character2.speed
      );
    }

    if (block === 'CURVA') {
      totalTestSkill1 = diceResult1 + character1.maneuverability;
      totalTestSkill2 = diceResult2 + character2.maneuverability;

      await logRollResult(
        character1.name,
        'maneuverability',
        diceResult1,
        character1.maneuverability
      );
      await logRollResult(
        character2.name,
        'maneuverability',
        diceResult1,
        character2.maneuverability
      );
    }

    if (block === 'CONFRONTO') {
      let powerResult1 = diceResult1 + character1.power;
      let powerResult2 = diceResult2 + character2.power;

      console.log(`R${character1.name} confrontou com ${character2.name}! 🥊`);

      await logRollResult(
        character1.name,
        'power',
        diceResult1,
        character1.power
      );
      await logRollResult(
        character2.name,
        'power',
        diceResult1,
        character2.power
      );

      if (powerResult1 > powerResult2 && character2.points > 0) {
        console.log(
          `${character1.name} venceu o confronto! ${character2.name} perdeu 1 ponto! 🐢`
        );
        character2.points--;
      }

      if (powerResult2 > powerResult1 && character1.points > 0) {
        console.log(
          `${character2.name} venceu o confronto! ${character1.name} perdeu 1 ponto! 🐢`
        );
        character1.points--;
      }

      // Apenas para conhecimento
      // character2.points -=
      //   powerResult1 > powerResult2 && character2.points > 0 ? 1 : 0;

      // character1.points -=
      //   powerResult2 > powerResult1 && character1.points > 0 ? 1 : 0;

      console.log(
        powerResult1 === powerResult2
          ? 'Confronto empatado! Sem pontos perdidos 👀'
          : ''
      );
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.name} marcou um ponto!`);
      character1.points++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.name} marcou um ponto!`);
      character2.points++;
    }

    console.log('---------------------------------');
  }
}

async function declareWinner(character1, character2) {
  console.log('Resultado final:');
  console.log(`${character1.name}: ${character1.points} ponto(s)`);
  console.log(`${character2.name}: ${character2.points} ponto(s)`);

  if (character1.points > character2.points) {
    console.log(`\n${character1.name} venceu a corrida! 🏆`);
  } else if (character2.points > character1.points) {
    console.log(`\n${character2.name} venceu a corrida! 🏆`);
  } else {
    console.log('A corrida terminou empatada...👀');
  }
}

(async function main() {
  console.log(
    `🏁 Corrida entre ${player1.name} e ${player2.name} começando... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
