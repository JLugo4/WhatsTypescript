//require("./style.css");
const form = document.querySelector<HTMLFormElement>('#defineform')!;
const list = document.querySelector<HTMLUListElement>('.list-unstyled')!;
const header = document.querySelector<HTMLHeadingElement>('h1')!;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const text = formData.get('defineword') as string;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
    const data = await response.json();

    header.textContent = text;

    list.innerHTML = '';
    data[0].meanings.forEach(({ partOfSpeech, definitions }) => {
      const li = document.createElement('li');
      li.textContent = `${partOfSpeech} - ${definitions[0].definition}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
});






