# import speech_recognition as sr
import google.generativeai as genai


genai.configure(api_key="AIzaSyDpQOmzDf1hr4t5dSWCzfqhIka_8DePLcQ")

generation_config = {
  "temperature": 0.7,  # Slightly less creative
  "top_p": 0.9,  # Smaller changes here
  "top_k": 1, 
  "max_output_tokens": 500  # Limit summary length
}


safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]


model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


# Core function
# ... other imports, config, model setup ...

def process_input_and_extract(user_input):

    prompt = f"Tell me only the medical details from the next paragraph (if there are no medical details in it, just say no medical details available and if available list those) and summarize it in brief 3 - 4 points, {user_input}"
    # convo = model.start_chat(history=[])
    # convo.send_message(prompt)  # Send the integrated prompt
    # response = convo.last.text
    # return response
    response = model.generate_content(prompt)
    return response.text



# Usage in another file
if __name__ == "__main__": 
    user_input = "Tell me a funny joke"  # Or get input dynamically
    last_nine = process_input_and_extract(user_input)
    print(last_nine)