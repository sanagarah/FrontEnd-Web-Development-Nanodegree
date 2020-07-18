const name = document.getElementById("name");
const r = document.getElementById("results");

export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export function updateUI(data) {
  r.innerHTML =
    data.polarity +
    "/ " +
    data.subjectivity +
    "/ " +
    data.text +
    "/ " +
    data.polarity_confidence +
    "/ " +
    data.subjectivity_confidence;
}

function handleSubmit(event) {
  event.preventDefault();

  postData("/NLP", {
    url: name.value,
  }).then((data) => {
    updateUI(data);
  });
}
export { handleSubmit };
