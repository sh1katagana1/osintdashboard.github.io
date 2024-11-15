function C5() {
    if ((typeof File != "undefined") && !File.prototype.slice) {
        if (File.prototype.webkitSlice) {
            File.prototype.slice = File.prototype.webkitSlice
        }
        if (File.prototype.mozSlice) {
            File.prototype.slice = File.prototype.mozSlice
        }
    }
    if (!(window.File && window.FileReader && window.FileList && window.Blob && File.prototype.slice)) {
        var a = "This function only works on the recent version of Firefox, Chrome and Opera. ";
        document.getElementById("drop_zone").innerHTML = a
    }
}
C5();
var nvx, j9, nu8, b2_, file, wq;
var b65 = false;
var njx = 1;
var s5z = "/js/MD5_worker.js";
var bShowFileDiv = false;
var nMD5StringDivTop = document.getElementById("MD5StringDiv").offsetTop;
var nMD5FileDivTop = document.getElementById("MD5FileDiv").offsetTop;
nMD5StringDivTop = nMD5FileDivTop - nMD5StringDivTop;
var h5g = null;
var n8o = 0;
var c4L = 0;
var nL3 = 0;

function gt2(e) {
    var d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var f = e;
    var c = "";
    for (var b = 0; b < f; b++) {
        var a = Math.floor(Math.random() * d.length);
        c += d.substring(a, a + 1)
    }
    return c
}

function jyc() {
    if (window.ActiveXObject) {
        h5g = new ActiveXObject("Microsoft.XMLHTTP")
    } else {
        if (window.XMLHttpRequest) {
            h5g = new XMLHttpRequest()
        } else {
            alert("Your browser does not support AJAX.");
            return
        }
    }
}

function g0P(b, a) {
    if (h5g == null) {
        jyc()
    }
    var c = gt2(5);
    h5g.open("GET", "get.php?" + c + b + "," + a, true);
    if (h5g != null) {
        h5g.onreadystatechange = function() {
            if (h5g.readyState == 4) {
                var e = h5g.responseText;
                var d = e.split(",");
                n8o = parseInt(d[0]);
                c4L = parseInt(d[1]);
                nL3 = parseInt(d[2]);
                eRm();
                Rga()
            }
        };
        h5g.send()
    }
}

function pP() {
    if (wq && nu8 < nvx) {
        b65 = !b65;
        var a = "Pause";
        if (b65) {
            a = "Continue"
        }
        document.getElementById("pauseBtn").value = a;
        if (!b65) {
            RM()
        }
    }
}

function aR() {
    if (wq) {
        wq.terminate()
    }
}

function RM() {
    if (nu8 < nvx) {
        j9 += b2_;
        nu8 += b2_;
        if (nu8 > nvx) {
            nu8 = nvx
        }
        Rga()
    }
}

function Hww() {
    return function(c) {
        if (b65) {
            return
        }
        var d = c.data.showPercent;
        if (d == 0) {
            if (nu8 == nvx) {
                Upp(1);
                document.getElementById("hash_string").value = (c.data.result).toUpperCase();
                c_P()
            } else {
                RM()
            }
        } else {
            var a = c.data.result;
            var b = (j9 + a) / nvx;
            Upp(b)
        }
    }
}

function hR(a) {
    wq.postMessage({
        dat: a.target.result,
        size: nvx,
        begin: j9,
        end: nu8,
        L1: n8o,
        L2: c4L,
        L3: nL3
    })
}

function Rga() {
    var a = new FileReader();
    a.onload = hR;
    var b = file.slice(j9, nu8);
    a.readAsArrayBuffer(b);
    if (a) {
        a.close()
    }
}

function iF3(a) {
    a.stopPropagation();
    a.preventDefault();
    if (wq) {
        wq.terminate()
    }
    if (s5z.length == 0) {
        s5z = "/js/MD5_worker.js"
    }
    wq = new Worker(s5z);
    var b = a.dataTransfer ? a.dataTransfer.files : a.target.files;
    file = b[0];
    document.getElementById("file_name_label").textContent = file.name;
    document.getElementById("file_size_label").textContent = commafy(file.size) + " Bytes";
    b2_ = 1024 * 1024;
    nvx = file.size;
    var c = nvx % b2_;
    g0P(c, nvx)
}

function hdd(a) {
    a.stopPropagation();
    a.preventDefault()
}

function Upp(c) {
    var a = document.getElementById("percent");
    var b = document.getElementById("percentText");
    var e = document.getElementById("ProcessDiv");
    var d = c * 100;
    d = d.toFixed(2);
    if (d <= 100) {
        a.style.width = d + "%";
        b.textContent = d + "%"
    }
}

function ae1() {
    document.getElementById("files").addEventListener("change", iF3, false);
    var a = document.getElementById("drop_zone");
    a.addEventListener("dragover", hdd, false);
    a.addEventListener("drop", iF3, false)
}

function ShowStringDiv() {
    document.getElementById("MD5FileDiv").style.visibility = "hidden";
    document.getElementById("MD5StringDiv").style.visibility = "visible";
    document.getElementById("MD5StringDiv").style.top = nMD5StringDivTop + "px"
}

function ShowFileDiv() {
    document.getElementById("MD5FileDiv").style.visibility = "visible";
    document.getElementById("MD5StringDiv").style.visibility = "hidden"
}

function rC() {
    var b = 1;
    if (document.getElementById("md5").checked) {
        b = 1
    } else {
        if (document.getElementById("sha1").checked) {
            b = 2
        } else {
            if (document.getElementById("sha256").checked) {
                b = 3
            }
        }
    }
    s5z = "/js/MD5_worker.js";
    switch (b) {
        case 1:
            s5z = "/js/MD5_worker.js";
            break;
        case 2:
            s5z = "/js/SHA1_worker.js";
            break;
        case 3:
            s5z = "/js/SHA256_worker.js";
            break;
        default:
            break
    }
    var a = njx;
    njx = b;
    if (njx == a) {
        return
    }
    if (!file) {
        return
    }
    if (wq) {
        wq.terminate()
    }
    wq = new Worker(s5z);
    eRm();
    Rga()
}

function eRm() {
    wq.addEventListener("message", Hww());
    document.getElementById("hash_string").value = "";
    document.getElementById("compare_ico").className = "";
    b65 = false;
    document.getElementById("pauseBtn").value = "Pause";
    j9 = 0;
    nu8 = b2_ > nvx ? nvx : b2_
}

function SelectAll(a) {
    document.getElementById(a).focus();
    document.getElementById(a).select()
}

function commafy(a) {
    var b = a.toString().split(".");
    if (b[0].length >= 5) {
        b[0] = b[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,")
    }
    if (b[1] && b[1].length >= 5) {
        b[1] = b[1].replace(/(\d{3})/g, "$1 ")
    }
    return b.join(".")
}

function c_P() {
    var d = document.getElementById("hash_string").value;
    var c = document.getElementById("hash_string2").value;
    var b = d;
    var a = c;
    d = d.toUpperCase();
    c = c.toUpperCase();
    d = d.replace(/\s/g, "");
    c = c.replace(/\s/g, "");
    if (b != d) {
        document.getElementById("hash_string").value = d
    }
    if (a != c) {
        document.getElementById("hash_string2").value = c
    }
    if (d.length == 0 || c.length == 0) {
        document.getElementById("compare_ico").className = "";
        return
    }
    if (d == c) {
        document.getElementById("compare_ico").className = "IcoSprite IcoCorrect IcoPos"
    } else {
        document.getElementById("compare_ico").className = "IcoSprite IcoError IcoPos"
    }
}

function v3X_() {
    var c = document.getElementById("texts").value;
    if (c.length == 0) {
        document.getElementById("hash_string3").value = "";
        return
    }
    var b = 1;
    if (document.getElementById("md52").checked) {
        b = 1
    } else {
        if (document.getElementById("sha12").checked) {
            b = 2
        } else {
            if (document.getElementById("sha2562").checked) {
                b = 3
            }
        }
    }
    var a = "";
    if (b == 1) {
        a = hex_md5(c)
    } else {
        if (b == 2) {
            a = hex_sha1(c)
        } else {
            a = hex_sha256(c)
        }
    }
    a = a.toUpperCase();
    document.getElementById("hash_string3").value = a
}
ae1();
document.getElementById("md5").checked = true;
document.getElementById("md52").checked = true;