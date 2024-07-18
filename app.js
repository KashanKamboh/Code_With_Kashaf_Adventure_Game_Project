#! /usr/bin/env node
import inquirer from "inquirer";
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // Percentage
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log(" \t Welcome to the Dungeon");
GAME: while (running) {
    console.log(" \t ===================================");
    let enemyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(`\t# ${enemy} has appeared # \t`);
    while (enemyHealth > 0) {
        console.log(` \t Your HP : ${health}`);
        console.log(` \t ${enemy} HP: ${enemyHealth}`);
        let control = await inquirer.prompt({
            message: " \tWhat Would you like to do?",
            type: "list",
            choices: [" \t Attack", " \t Drink Health Portion", " \t Run "],
            name: "cammand",
        });
        switch (control.cammand) {
            case " \t Attack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(`\t You Strike the ${enemy} with ${strikeDamage} damage \n.`);
                console.log(`\t You received ${damageTaken} damage from the enemy`);
                if (health < 1) {
                    console.log("\t You've taken too much damage. You are too weak to go on.");
                    break;
                }
                break;
            case " \t Drink Health Portion":
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    console.log(`\t You drank health potion, healing yourself for ${healthPotionHealAmount} \n \t You now have ${health} HP \n\t You now have ${numHealthPotions} left`);
                }
                else {
                    console.log(`\t You have no health potion left, defeat enemies for a chance to get one.`);
                }
                break;
            case " \t Run ":
                console.log(`\t You run away from the ${enemy}.`);
                continue GAME;
                break;
        }
        break;
    }
    if (health < 1) {
        console.log(`\t You limp out of the dungeon, weak from battle `);
        break;
    }
    console.log("\t ======================================");
    console.log(`\t # ${enemy} has been defeated # \n`);
    console.log(`\t# You have ${health} HP left #`);
    if (getRandomNumber(1, 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`\t # The ${enemy} dropped a health potion #\n`);
        console.log(`\t # You now have ${numHealthPotions} health potion(s) #`);
    }
    //      async function main() {
    //      const stateControl = await inquirer.prompt([
    //     {
    //       type: 'list',
    //       name: 'command',
    //       message: '\t What would you like to do?',
    //       choices:['\t Continue Fighting',' \t Exit Dungeon'],
    //     },
    //   ]);
    //   if (stateControl.command === '\t Continue Fighting') {
    //     console.log('\t You can continue your adventure!');
    //   } else {
    //     console.log('\t You exit the dungeon, Successful from your adventures.');
    //     }
    //   }
    //    main();
    // let stateControl = inquirer.prompt({
    //   message: "\t What would you like to do?",
    //   type: "list",
    //   choices: ["\t Continue Fighting", "Exit Dungeon"],
    //   name : "command",
    // });
    // if (stateControl.command === "\t Continue Fighting")
    // {
    //   console.log(`\t You can continue your adventure!`);
    // }else
    // {
    //   console.log(`\t You exit the dungeon, Successful from your adventures.`);
    //   break;
    // }
    // const inquirer = require('inquirer');
    // Function to handle the user's choice
    function handleUserChoice() {
        const questions = [
            {
                message: "\t What would you like to do?",
                type: "list",
                choices: ["\t Continue Fighting", "Exit Dungeon"],
                name: "command",
            },
        ];
        inquirer.prompt(questions).then((answers) => {
            const command = answers.command;
            if (command === "Continue Fighting") {
                console.log(`\t You can continue your adventure!`);
            }
            else {
                console.log(`\t You exit the dungeon, successful from your adventures.`);
                // Assuming you have a way to exit the loop or function after exiting the dungeon
                // (replace `break;` with your specific logic)
                return; // or process.exit() if exiting the program entirely
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    }
    // Call the function to initiate the prompt
    handleUserChoice();
}
console.log(`\t ########################`);
console.log(`\t THANK YOU FOR PLAYING`);
console.log(`\t ########################`);
