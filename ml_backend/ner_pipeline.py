from transformers import pipeline
import numpy as np


ner_pipe = pipeline(
    "token-classification",
    model="Clinical-AI-Apollo/Medical-NER",
    aggregation_strategy="simple",
)



def extract_ner(text: str):
    output = ner_pipe(text)
    for item in output:
        for key, value in item.items():
            if isinstance(value, np.float32):
                item[key] = value.item()
    return output


print(extract_ner("Patient Name: John Doe DOB: January 15, 1975 Gender: Male Date of Admission: March 23, 2024 MRN (Medical Record Number): 123456789  Chief Complaint: The patient presents with complaints of persistent headaches and visual disturbances for the past three months.  History of Present Illness: Mr. Doe reports experiencing progressive headaches, particularly in the mornings, accompanied by blurred vision and occasional nausea. He states that these symptoms have been gradually worsening over the past few months. Additionally, he has noticed a decrease in his peripheral vision.  Past Medical History: - Hypertension, diagnosed in 2010 - Allergies: Penicillin (rash) - Surgical History: Appendectomy in 1995  Family History: - Father diagnosed with colon cancer at age 55 - Mother alive with no signiﬁcant medical history - One sister with history of breast cancer at age 42  Social History: Mr. Doe is married with two children. He works as an accountant and denies tobacco, alcohol, or illicit drug use.  Medications: - Lisinopril 10 mg daily for hypertension  Physical Examination: - Vital Signs: BP 140/90 mmHg, HR 76 bpm, RR 16 breaths/min, Temp 98.6°F - General: Alert and oriented x3, in no acute distress - Head: Normocephalic, atraumatic - Eyes: Bilateral papilledema noted, visual acuity decreased bilaterally, pupils equal and reactive to light - Neurological: Cranial nerves II-XII intact, motor strength 5/5 in all extremities, sensation intact bilaterally, no focal deﬁcits noted  Diagnostic Workup: - MRI Brain: Revealed a large, enhancing mass in the sellar region consistent with a pituitary adenoma. - Laboratory: Normal CBC, BMP , liver function tests, thyroid function tests. - Hormonal Assays: Elevated levels of prolactin and growth hormone, consistent with a functioning pituitary adenoma.  Assessment: - Pituitary adenoma, likely secreting prolactin and growth hormone - Visual disturbances secondary to mass ebect and compression of optic chiasm  Plan: 1. Neurosurgical consultation for consideration of transsphenoidal resection of the pituitary adenoma. 2. Initiation of dopamine agonist therapy (e.g., cabergoline) to manage prolactinoma. 3. Ophthalmology consultation for further evaluation and monitoring of visual disturbances. 4. Close monitoring of blood pressure and electrolytes, particularly postoperatively.  Patient and family educated regarding the diagnosis, treatment options, and potential complications. The risks and beneﬁts of surgery, as well as the importance of adherence to medical therapy, were discussed in detail. The patient expressed understanding and consented to the proposed plan. Follow-up appointments scheduled accordingly."))