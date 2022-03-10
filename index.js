const DPE_index = 86;
const GLS_index = 22;

function calculateIndex(DPE_index, GLS_index) {
  let DPE_class = [0, 0, 0];
  if (DPE_index <= 70) {
    DPE_class[0] = 0;
  } else {
    if (DPE_index <= 110) {
      DPE_class[0] = 1;
    } else {
      if (DPE_index <= 180) {
        DPE_class[0] = 2;
      } else {
        if (DPE_index <= 250) {
          DPE_class[0] = 3;
        } else {
          if (DPE_index <= 330) {
            DPE_class[0] = 4;
          } else {
            if (DPE_index <= 420) {
              DPE_class[0] = 5;
            } else {
              DPE_class[0] = 6;
            }
          }
        }
      }
    }
  }
  if (GLS_index <= 6) {
    DPE_class[1] = 0;
  } else {
    if (GLS_index <= 11) {
      DPE_class[1] = 1;
    } else {
      if (GLS_index <= 30) {
        DPE_class[1] = 2;
      } else {
        if (GLS_index <= 50) {
          DPE_class[1] = 3;
        } else {
          if (GLS_index <= 70) {
            DPE_class[1] = 4;
          } else {
            if (GLS_index <= 100) {
              DPE_class[1] = 5;
            } else {
              DPE_class[1] = 6;
            }
          }
        }
      }
    }
  }
  DPE_class[2] = Math.max(DPE_class[0], DPE_class[1]);

  return DPE_class;
}

function changeNextPolygons(id) {
  // décale et allonge les polygones situés en dessous de id
  for (let i = id + 1; i < 7; i++) {
    document.getElementById("Lpolynome" + i).classList.add("displayPolynom");
    document.getElementById("lettrageL" + i).classList.add("displayPolynom");
    document.getElementById("polynome" + i).classList.add("hiddenPolynom");
    document.getElementById("lettrage" + i).classList.add("hiddenPolynom");
  }
}

function changePolygon(id) {
  // modifie le polygone id
  let decalage = 11 * id;
  console.log("decalage = " + decalage);
  // efface le polynome id d'origine et sa lettre
  document.getElementById("polynome" + id).classList.add("hiddenPolynom");
  document.getElementById("lettrage" + id).classList.add("hiddenPolynom");
  // ajout du cartouche à gauche du polygone id:
  document
    .getElementById("Gpolynome" + id)
    .classList.add("displayPolynom", "frame1");
  // grossisement de la lettre sur polygone id :
  document
    .getElementById("lettrageG" + id)
    .classList.add("displayPolynom", "frame06");
  document.getElementById("indexFrame" + id).classList.add("frame1");
  // ajoute le lettrage
  document.getElementById("frameContentDPE").classList.add("displayPolynom");
  document
    .getElementById("frameContentDPE")
    .style.setProperty("transform", "translateY(" + decalage + "px");
  document.getElementById("frameContentDPE").innerHTML = `
        <text id="indexDPE" class="valueDPE" x="19" y="11">${DPE_index}</text>
        <text class="unitDPE" x="19" y="15">KWh/m².an</text>
        <text id="indexGLS" class="valueDPE" x="40" y="11">${GLS_index}</text>
        <text class="unitDPE" x="35.2" y="15">KgCO</text>
        <text class="unitDPEsub" x="39.7" y="15.5">2</text>
        <text class="unitDPE" x="44.4" y="15">/m².an</text>
        <text class="unitDPE" x="19" y="-5">consommation</text>
        <text class="nrjPrimaire" x="19" y="-2">(énergie primaire)</text>
        <text class="unitDPE" x="40" y="-2">émissions</text>
    `;
}

function setPolygon(id) {
  changePolygon(id);
  changeNextPolygons(id);
  document.getElementById("polygonesDPE").innerHTML += `
  <text class="logementPerf" x="50" y="-2">logement très performant</text>
  `;
  document.getElementById("longPolygonesDPE").innerHTML += `
  <text class="logementCons" x="50" y="90">logement extrêmement consommateur d'énergie</text>
  `;
}

console.log(calculateIndex(DPE_index, GLS_index));
setPolygon(calculateIndex(DPE_index, GLS_index)[2]);

function getScreenshot() {
  const exportDPE = document.getElementById("sectionDPE", {
    width: "300px",
    height: "300px",
  });
  html2canvas(exportDPE).then((canvas) => {
    document.getElementById("outputDPE").appendChild(canvas);
    let cvs = document.querySelector("canvas");
    let a = document.querySelector(".a");
    a.href = cvs.toDataURL();
    a.download = "etiquetteDPE.png";
  });
}
