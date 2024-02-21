import uvicorn
from fastapi import FastAPI, UploadFile, File
from jaysmlmodel import IrisModel, IrisSpecies
import cv2

# app, model객체 생성
app = FastAPI()
model = IrisModel()


@app.post('/predict')
def predict_species(iris: IrisSpecies):
    data = iris.dict()
    prediction, probability = model.predict_species(
        data['sepal_length'], data['sepal_width'], data['petal_length'], data['petal_width']
    )
    return {
        'prediction': prediction,
        'probability': probability
    }

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    # 업로드한 이미지를 파일로 저장합니다.
    with open(file.filename, "wb") as f:
        f.write(contents)

    # 얼굴 인식을 위해 OpenCV를 사용합니다.
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    img = cv2.imread(file.filename)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # 검출된 얼굴을 표시합니다.
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

    # 결과 이미지를 저장합니다.
    output_filename = "output_" + file.filename
    cv2.imwrite(output_filename, img)

    return {"filename": file.filename, "output_filename": output_filename}

# uvicorn으로 api실행 -> http://127.0.0.1:8000에서 돌아감
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

