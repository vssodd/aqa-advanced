function getTodo() {
  return fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => response.json());
}

function getUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1').then((response) => response.json());
}

const allResult = Promise.all([getTodo(), getUser()])
  .then((results) => {
    console.log('Promise.all results:');
    console.log('Todo:', results[0]);
    console.log('User:', results[1]);
  })
  .catch((error) => {
    console.error('Promise.all error:', error);
  });

const raceResult = Promise.race([getTodo(), getUser()])
  .then((result) => {
    console.log('Promise.race winner:', result);
  })
  .catch((error) => {
    console.error('Promise.race error:', error);
  });
