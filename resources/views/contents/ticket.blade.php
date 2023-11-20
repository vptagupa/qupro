<html>

<head>
    <style>
        p:first-child {
            font-size: 30px;
        }

        p:nth-child(2) {
            font-size: 10px;
            text-transform: uppercase;
        }

        p {
            margin: 0;
            padding: 0;
            text-align: center;
        }
    </style>
</head>

<body>
    <p>{{$ticket}}</p>
    <p>{{$accountType}}</p>
</body>

</html>