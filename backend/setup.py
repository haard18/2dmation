from setuptools import setup, find_packages

setup(
    name="2dmation",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "manim",
        "redis",
        "fastapi",
        "google-generativeai",
    ],
) 