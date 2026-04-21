async function getTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return response.json();
}

async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return response.json();
}

async function main() {
  try {
    const allResult = await Promise.all([getTodo(), getUser()]);
    console.log("Promise.all results:");
    console.log("Todo:", allResult[0]);
    console.log("User:", allResult[1]);

    const raceResult = await Promise.race([getTodo(), getUser()]);
    console.log("Promise.race winner:", raceResult);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
