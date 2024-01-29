# 프로젝트 가져오는 절차

1. 본인 깃허브로 `fork`

2. `fork`한 repository clone(복제하기) : 프로젝트가 운영될 폴더하나 생성하고 `git bash`나 터미널에서 해당 폴더 밑에서 명령어작업이든 머든 해야함

명령어 :
```bash
git clone https://github.com/자기이름/ECST.git
```

3. react는 frontend들어가서 작업

4. 서버 실행 방법

### Run django server
  a. cd to backend
  b. `python manage.py runserver` 이게 서버 돌리는 코드
### Run react server
  a. cd to frontend
  b.` npm run dev` 이게 클라이언트 돌리는 코드

5. commit 방법 ****정말 중요
   - 기본 순서는 pull > confict 해결 > push
   - `fork`한 레포랑 `fork를 떠온 레포`를 먼저 똑같이 만들어주어야 함
   - 그 후에 pull하고 ~~ push
   - pull request를 기존 레포지토리에 요청
   - 기존 레포지토리가 수락하면 코드가 적용됨
  
6. 사실 이희원도 겁나 헷갈려서 맨날 날려먹으니까 찾아보기..

---


## How to Setup React and Tailwind CSS with Vite in a Project

참고문서
https://tailwindcss.com/docs/guides/vite

## 1. create your project folder and navigate to folder

```bash
npm crate vite@latest your-project-name -- --template react
cd yourt-project-name
```
### 2. install Tailwind CSS and Other Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. generate the configuration files

```bash
npx tailwindcss init -p
```

### 4. configure source paths
tailwind.config.cjs 파일의 `content`에 경로를 추가한다.

```javascript
"./index.html",
"./ser/**/*.{js,ts,jsx,tsx}",
```

### 5. add tailwind directives to your CSS

`./src/index.css`파일에 상태 추가

```bash
@tailwind base;

@tailwind components;

@tailwind utilities;
```

## React icons

공식 문서
https://react-icons.github.io/react-icons/

### 1. install

```bash
npm install react-icons --save
```

### 2. usage

```javascript
import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```


### 1. installation for meteorjs, gatsbyjs, etc..

```bash
npm install @react-icons/all-files --save
```

```bash
npm i daisyui
```


QUICK SETUP:

1) Install and activate virtual environment
In the root folder, on the terminal create a virtual environment.
 Terminal command: python -m venv [name of the environment (usually env)]
 Activate command: source env/Scripts/activate

2) Creating and setting up Django Project
 a) Install django and all the main libraries : 
  a. pip install django 
  b. pip install djangorestframework django-cors-headers
  
 b) Create project in terminal: django-admin startproject backend
 c) Cd to the backend folder
 d) Create an app in django in the terminal
  a. python manage.py startapp [name of the app]
  
3) Create a react app using vite
Go back to the root folder and:
 a) npm create vite@latest frontend -- --template react
 b) cd frontend
 c) npm install

4) Open VS code and the run the servers
 a) In the root folder open VS code:
  a. code .
 b) Open two terminals and make sure your virtual environment is active

 
  
