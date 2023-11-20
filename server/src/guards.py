from fastapi import HTTPException
from starlette import status


def is_positive_int(_value: int, _name: str):
    if _value < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'{_name} should be a positive integer (actual: {_value})',
        )


def is_in_range_int(_value: int, _min: int, _max: int, _name: str):
    if _value < _min or _value > _max:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'{_name} number must be between {_min} and {_max} (actual: {_value})',
        )
