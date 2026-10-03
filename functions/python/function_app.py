from importlib import metadata

import azure.functions as func


app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="health", methods=["GET"])
def health(req: func.HttpRequest) -> func.HttpResponse:
    del req
    return func.HttpResponse(
        body=(
            '{"status":"ok","service":"wick-python",'
            f'"runtime":"python 3.12","librosa":"{metadata.version("librosa")}"}}'
        ),
        status_code=200,
        mimetype="application/json",
    )
