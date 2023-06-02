commands:
	python3 -m venv venv
	source venv/bin/activate

nextjs-packages:
	pnpm add concurrently

py-modules:
	pip install fastapi pydantic 'uvicorn[standard]'
