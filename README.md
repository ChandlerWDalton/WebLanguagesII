# WebLanguagesII

# APIs

# TODOS

GET /todos

returns all toDos

-

POST /todo
body example
{
    "todo":  {
        "name": "Clean Room",
        "done": false,
        "id": '4564',
        "categories": []
    }
}

returns status and updated array

-

PUT /todo
body example
{
    "todo":  {
        "name": "Clean Room",
        "done": false,
        "id": '4564',
        "categories": []
    }
}

returns status and updated array

-

DELETE /todo
body example
{
    "todo":  {
        "name": "Clean Room",
        "done": false,
        "id": '4564',
        "categories": []
    }
}

returns status and updated array

# Categories

GET /categories

returns all categories

-

POST /category
body example
{
    "category":  {
        "id": "4862",
        "name": "chores",
        "color": "#69fe43"
    }
}

returns status and updated array

-

PUT /category
body example
{
    "category":  {
        "id": "4862",
        "name": "chores",
        "color": "#69fe43"
    }
}

returns status and updated array

-

DELETE /category
body example
{
    "category":  {
        "id": "4862",
        "name": "chores",
        "color": "#69fe43"
    }
}

returns status and updated array