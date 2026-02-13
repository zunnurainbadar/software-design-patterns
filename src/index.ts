
import inquirer from 'inquirer';
import { exec } from 'child_process';

async function main() {
  const { pattern } = await inquirer.prompt([
    {
      type: 'list',
      name: 'pattern',
      message: 'Which design pattern do you want to test?',
      choices: [
        { name: 'Factory Pattern', value: 'factory-pattern' },
        // Add more patterns here as you implement them
      ],
    },
  ]);

  // Map pattern to test file
  let testPath = '';
  switch (pattern) {
    case 'factory-pattern':
      testPath = 'src/factory-pattern/factory-pattern.test.ts';
      break;
    default:
      console.error('Unknown pattern');
      process.exit(1);
  }

  // Run jest for the selected test file
  exec(`npx jest ${testPath} --passWithNoTests`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running tests: ${stderr}`);
      process.exit(error.code || 1);
    }
    console.log(stdout);
  });
}

main();
