
<?php

// CLASS INDUK
class Segitiga {

    private $alas, $tinggi, $sisi;
    
    function setAlas($alas) {
        $this->alas = $alas;
    }

    function setTinggi($tinggi) {
        $this->tinggi = $tinggi;
    }

    function setSisi($sisi) {
        $this->sisi = $sisi;
    }

    // GETTER
    function getAlas() {
        return $this->alas;
    }

    function getTinggi() {
        return $this->tinggi;
    }

    function getSisi() {
        return $this->sisi;
    }
}


// SEGITIGA SIKU-SIKU
class SegitigaSikuSiku extends Segitiga {

    function hitungLuas() {
        return 0.5 * $this->getAlas() * $this->getTinggi();
    }

    function hitungKeliling() {
        $miring = sqrt(
            pow($this->getAlas(), 2) +
            pow($this->getTinggi(), 2)
        );

        return $this->getAlas() + $this->getTinggi() + $miring;
    }
}


// SEGITIGA SAMA KAKI
class SegitigaSamaKaki extends Segitiga {

    private $sisiKaki;

    function setSisiKaki($sisiKaki) {
        $this->sisiKaki = $sisiKaki;
    }

    function getSisiKaki() {
        return $this->sisiKaki;
    }

    function hitungLuas() {
        return 0.5 * $this->getAlas() * $this->getTinggi();
    }

    function hitungKeliling() {
        return $this->getAlas() + (2 * $this->getSisiKaki());
    }
}


// SEGITIGA SAMA SISI
class SegitigaSamaSisi extends Segitiga {

    function hitungLuas() {
        return (sqrt(3) / 4) * pow($this->getSisi(), 2);
    }

    function hitungKeliling() {
        return 3 * $this->getSisi();
    }
}


// PROGRAM UTAMA

// Objek Segitiga Siku-Siku
$siku = new SegitigaSikuSiku();
$siku->setAlas(3);
$siku->setTinggi(4);

// Objek Segitiga Sama Kaki
$kaki = new SegitigaSamaKaki();
$kaki->setAlas(6);
$kaki->setTinggi(4);
$kaki->setSisiKaki(5);

// Objek Segitiga Sama Sisi
$sisi = new SegitigaSamaSisi();
$sisi->setSisi(6);


// MENAMPILKAN HASIL

echo "SEGITIGA SIKU-SIKU <br>";
echo "Luas: " . $siku->hitungLuas() . "<br>";
echo "Keliling: " . $siku->hitungKeliling() . "<br><br>";

echo "SEGITIGA SAMA KAKI <br>";
echo "Luas: " . $kaki->hitungLuas() . "<br>";
echo "Keliling: " . $kaki->hitungKeliling() . "<br><br>";

echo "SEGITIGA SAMA SISI <br>";
echo "Luas: " . $sisi->hitungLuas() . "<br>";
echo "Keliling: " . $sisi->hitungKeliling() . "<br>";

?>
