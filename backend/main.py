import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, UploadFile, File

from jaysmlmodel import IrisModel, IrisSpecies
import cv2
import base64
import numpy as np

from pydantic import BaseModel

from fastapi.responses import StreamingResponse

# cv2 모듈 import

from PIL import Image
import io



# app, model객체 생성
app = FastAPI()
model = IrisModel()
# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)
class Frame(BaseModel):
    frame: bytes




# 이미지 파일을 받아 서버에 저장하는 엔드포인트
@app.post("/api/video-frame")
async def receive_video_frame(file: bytes = File()):
    try:
        print("1Received frame")
        # 이미지 데이터를 base64로 디코딩하여 처리
        image_data = base64.b64decode(file)
        # image_data = file

        # 바이너리 데이터를 NumPy 배열로 변환
        nparr = np.frombuffer(image_data, dtype=np.uint8)
        print(nparr)
        # NumPy 배열을 이미지로 디코딩
        # img_buffer = cv2.imdecode(cv2.Mat(1, len(nparr), cv2.CV_8UC1, nparr), cv2.IMREAD_COLOR)
        # print(img_buffer)

        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        print(image)

        cv2.imwrite("result.jpg", image)

        # encoded = cv2.imencode('.jpg', nparr, [cv2.IMWRITE_JPEG_QUALITY, 100])[1]



        # 이미지가 유효한지 확인
        if image is not None:
            # 이미지를 파일로 저장
            print("저장할거자나")
            cv2.imwrite("received_frame22.jpeg", image)
            return {"message": "1Frame received"}
        else:
            return {"error": "2Failed to decode image"}
    except Exception as e:
        return {"error": f"A3n error occurred: {str(e)}"}
    print("설마");
    # print("들어오긴 햇어")
    # # 이미지 데이터를 base64로 디코딩하여 처리
    # image_data = base64.b64decode(file.__bytes__())
    #
    # print(image_data)
    #
    # # 바이너리 데이터를 NumPy 배열로 변환
    # nparr = np.frombuffer(image_data, np.uint8)
    #
    # # NumPy 배열을 이미지로 디코딩
    # image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # # image = cv2.imread(nparr, cv2.IMREAD_COLOR)
    #
    # # 이미지가 유효한지 확인
    # if image is not None:
    #     # 이미지를 파일로 저장
    #     cv2.imwrite("received_frame2.jpg", image)
    #     print("Received frame")
    #     return {"message": "Frame received"}
    # else:
    #     print("Received frame but failed to decode image")
    #     return {"message": "Failed to decode image"}
    # 예를 들어, 디코딩된 이미지 데이터를 저장하거나 분석하는 등의 작업을 수행할 수 있습니다.
    # print("Received frame")

    # # 여기서 이미지 데이터를 처리하는 로직을 작성하세요.
    # # 이미지를 파일로 저장
    # with open("received_frame2.jpg", "wb") as f:
    #     f.write(image_data)
    # # 예를 들어, 디코딩된 이미지 데이터를 저장하거나 분석하는 등의 작업을 수행할 수 있습니다.
    # print("Received frame")
    # print(image_data)
    return {"message": "Fr4ame received"}

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
    uvicorn.run(app, host='127.0.0.1', port=8001)
