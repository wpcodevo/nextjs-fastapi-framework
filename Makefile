commands:
	python3 -m venv venv
	source venv/bin/activate

nextjs-packages:
	pnpm add concurrently zustand

py-modules:
	pip install fastapi 'uvicorn[standard]'
