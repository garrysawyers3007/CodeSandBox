import { useState, useEffect } from 'react';

/*
Python script used to get the URL in step 2:
import requests
from bs4 import BeautifulSoup

# The URL to fetch the HTML content from.
url = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"

# Use a try-except block to handle potential network errors
try:
    # Fetch the HTML content from the specified URL
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
    html_content = response.text
except requests.exceptions.RequestException as e:
    # Print an error message and exit if fetching the URL fails
    print(f"Error fetching URL: {e}")
    html_content = None

soup = BeautifulSoup(html_content, 'html.parser')

# A list to store the extracted characters
url_characters = []

# Find all <b> tags with the class "ref"
b_tags = soup.find_all('b', class_='ref')

# Iterate through each matching <b> tag and get its value
for b_tag in b_tags:
    char = b_tag.get('value')
    if char:
        url_characters.append(char)

# Join the characters to form the complete URL
final_url = "".join(url_characters)

# Print the result
print(f"The extracted URL is: {final_url}")

*/

// Main React component for the application.
const App = () => {
  // State to hold the loading status of the fetch request.
  const [isLoading, setIsLoading] = useState(true);
  // State to hold the full, fetched text.
  const [fullText, setFullText] = useState('');
  // State to hold the text as it is being revealed character by character.
  const [charArray, setCharArray] = useState([]);

  // useEffect hook to handle the initial data fetching from the URL.
  // The empty dependency array [] ensures this runs only once when the component mounts.
  useEffect(() => {
    // The URL to fetch data from.
    const url = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636172";

    // Asynchronous function to fetch and process the data.
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        // Ensure the HTTP request was successful.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Get the HTML content as text.
        const html = await response.text();

        // Parse the HTML to extract text content.
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const extractedText = doc.body.textContent.trim();

        // Set the state with the extracted text and update loading status.
        setFullText(extractedText);
        setIsLoading(false);

      } catch (error) {
        // Log any errors that occur during the fetch process.
        console.error("Failed to fetch or parse the URL:", error);
        setIsLoading(false);
      }
    };

    // Call the fetchData function.
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once.

  // This effect runs whenever the fullText state changes (i.e., after the fetch is complete).
  useEffect(() => {
    // Only proceed if the fullText is available and there's content to animate.
    if (fullText.length > 0) {
      // Define a function for the animation loop that takes an index as a parameter.
      const animateText = (index) => {
        // Use a timeout for each character to add the delay.
        setTimeout(() => {
          setCharArray(prev => [...prev, fullText[index]]);
          // Continue the animation if there are more characters.
          if (index + 1 < fullText.length) {
            animateText(index + 1);
          }
        }, 500); // The delay is set to 500ms.
      };

      // Start the animation with the first character at index 0.
      animateText(0);
    }
  }, [fullText]); // This effect depends on the fullText state.

  // The component's render function.
  return (
    <div>
      {/* Conditionally render "Loading..." text while the data is being fetched. */}
      {isLoading && <p>Loading...</p>}

      {/* Conditionally render the flag once it's available and being animated. */}
      {!isLoading && fullText.length > 0 && (
        <ul>
          {/*
            Map over the charArray, which is a stable array of characters, to render each as a list item.
          */}
          {charArray.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
