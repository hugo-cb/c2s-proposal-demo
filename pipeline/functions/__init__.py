from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langsmith import traceable


@traceable(name="default_node_ai_function")
def default_node_ai_function(prompt_template: str, inputs: dict) -> dict:
    llm = ChatOpenAI(model="gpt-4", temperature=0.2)
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=list(inputs.keys())
    )
    chain = prompt | llm
    result = chain.invoke(
        inputs,
        config={
            "tags": ["pipeline", "node"],
            "run_name": "pipeline-node"
        }
    )
    return {"result": result.content}
