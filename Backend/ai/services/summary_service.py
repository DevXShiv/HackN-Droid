from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load model and tokenizer once at startup
model_name = "facebook/bart-large-cnn"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


def generate_unbiased_summary(texts):
    """
    Takes a list of article texts and returns a neutral AI-generated summary.
    """
    combined_text = " ".join(texts)
    combined_text = combined_text[:3000]  # limit input

    inputs = tokenizer(combined_text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(
        inputs["input_ids"],
        max_length=200,
        min_length=80,
        num_beams=4,
        length_penalty=2.0,
        do_sample=False,
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary
