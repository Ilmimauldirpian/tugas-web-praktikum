<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tugas PHP - Latihan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h3 {
            margin-top: 30px;
        }
        table {
            border-collapse: collapse;
            text-align: center;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            width: 35px;
            height: 30px;
            font-weight: bold;
        }
        .header-hijau {
            background-color: #00FF00;
        }
        .sel-kuning {
            background-color: yellow;
        }
        .sel-cyan {
            background-color: cyan;
        }
    </style>
</head>
<body>

    <!-- LATIHAN 1 -->
    <h3>Latihan 1</h3>
    <p>Pengulangan 1 sampai 10 (hanya menampilkan nilai genap):</p>
    <?php
    for ($i = 1; $i <= 10; $i++) {
        if ($i % 2 == 0) {
            echo $i . " ";
        }
    }
    ?>

    <!-- LATIHAN 2 -->
    <h3>Latihan 2</h3>
    <p>Tabel Perkalian Matriks:</p>
    <table>
        <!-- Baris Header Utama -->
        <tr>
            <th class="header-hijau">bilangan</th>
            <?php
            for ($i = 1; $i <= 10; $i++) {
                echo "<th class='header-hijau'>$i</th>";
            }
            ?>
        </tr>

        <!-- Baris Isi Matriks -->
        <?php
        for ($r = 1; $r <= 10; $r++) {
            echo "<tr>";
            // Kolom Header Samping
            echo "<th class='header-hijau'>$r</th>";

            // Kolom Hasil Perkalian
            for ($c = 1; $c <= 10; $c++) {
                $hasil = $r * $c;
                // Menentukan warna: Ganjil = Kuning, Genap = Cyan
                $warna = ($hasil % 2 != 0) ? "sel-kuning" : "sel-cyan";
                
                echo "<td class='$warna'>$hasil</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>

</body>
</html>