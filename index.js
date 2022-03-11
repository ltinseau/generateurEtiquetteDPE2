const DPE_index = 86;
const GES_index = 30;
const QualityEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  EXTRALARGE: 4,
  HD: 5,
  properties: {
    1: {
      value: 1,
      name: "Small",
      resolution: "96ppp",
      taille: "35 Ko",
      scale: 1.73,
    },
    2: {
      value: 2,
      name: "Medium",
      resolution: "150ppp",
      taille: "55 Ko",
      scale: 2.7,
    },
    3: {
      value: 3,
      name: "Large",
      resolution: "200ppp",
      taille: "90 Ko",
      scale: 3.96,
    },
    4: {
      value: 4,
      name: "Extra large",
      resolution: "300ppp",
      taille: "400 Ko",
      scale: 10,
    },
    5: {
      value: 4,
      name: "Haute définition",
      resolution: "600ppp",
      taille: "580 Ko",
      scale: 11.8,
    },
  },
};

function calculateIndex(DPE_index, GES_index) {
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
  if (GES_index <= 6) {
    DPE_class[1] = 0;
  } else {
    if (GES_index <= 11) {
      DPE_class[1] = 1;
    } else {
      if (GES_index <= 30) {
        DPE_class[1] = 2;
      } else {
        if (GES_index <= 50) {
          DPE_class[1] = 3;
        } else {
          if (GES_index <= 70) {
            DPE_class[1] = 4;
          } else {
            if (GES_index <= 100) {
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
        <text id="indexGLS" class="valueDPE" x="40" y="11">${GES_index}</text>
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

function graphGESDisplay(id) {
  const sectionGES = document.getElementById("sectionGES");
  sectionGES.innerHTML = `
        <svg
          id="svgGES"
          width="400"
          height="400"
          style="background: white"
          viewBox="0 -10 140 105"
        ></svg>
  `;
  const svgGES = document.getElementById("svgGES");
  svgGES.innerHTML = `
        <g id="polygonesGES"></g>
        <g id="grosPolygonesGES"></g>
        <g id="longPolygonesGES"></g>
        <g id="lettragesGES" class="lettrage"></g>
        <g id="grownLettragesGES" class="lettrageG"></g>
        <g id="longLettragesGES" class="lettrage"></g>
        <g id="indexLine"></g>
        <g id="frameContentGES" fill-opacity="0.5"></g>
      `;

  for (i = 0; i < 7; i++) {
    document.getElementById("polygonesGES").innerHTML += `
          <path
            id="shapeGES${i}"
            fill="var(--color-GES${i + 1})"
            fill-opacity="1"
            d="M5 ${11 * i} h ${13 + 8.876 * i} q 5 0 5 5 0 5 -5 5 h -${
      13 + 8.876 * i
    } Z"
          />
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("grosPolygonesGES").innerHTML += `
          <path
            id="GshapeGES${i}"
            fill="var(--color-GES${i + 1})"
            fill-opacity="0"
            d="M5 ${11 * i} h ${
      11.706 + 8.876 * i
    } q 10 0 10 10 0 10 -10 10 h -${11.706 + 8.876 * i} Z"
          />
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("longPolygonesGES").innerHTML += `
          <path
            id="LshapeGES${i}"
            fill="var(--color-GES${i + 1})"
            fill-opacity="0"
            d="M5 ${10 + 11 * i} h ${
      13 + 8.069 + 8.876 * i
    } q 5 0 5 5 0 5 -5 5 h -${13 + 8.069 + 8.876 * i} Z"
          />
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("lettragesGES").innerHTML += `
        <text id="lettrageGES${i}" x="7.5" y="${8.5 + 11 * i}">&#${
      65 + i
    }</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("grownLettragesGES").innerHTML += `
        <text id="GlettrageGES${i}" x="7.5" y="${
      16.5 + 11 * i
    }" fill-opacity="0">&#${65 + i}</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("longLettragesGES").innerHTML += `
        <text id="LlettrageGES${i}" x="7.5" y="${
      18.5 + 11 * i
    }" fill-opacity="0">&#${65 + i}</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("indexLine").innerHTML += `
      <path
        id="indexLine${i}"
        fill-opacity="0"
        stroke="white"
        stroke-width="1"
        d="M ${30 + 8.876 * i} ${i * 11 + 10} 88 ${i * 11 + 10}"
  ></path>
  `;
  }
}
function changeGraph(id) {
  // équivalent change Polygon
  // modifie le polygone id
  let decalage = 11 * id;
  // efface le polynome id d'origine et sa lettre
  document.getElementById("shapeGES" + id).classList.add("hiddenPolynom");
  document.getElementById("lettrageGES" + id).classList.add("hiddenPolynom");
  // ajout du gros polygone id:
  document
    .getElementById("GshapeGES" + id)
    .classList.add("displayPolynom", "frame1");
  // ajout de la ligne à droite du polygone id:
  document
    .getElementById("indexLine" + id)
    .classList.add("displayPolynom", "frame1");
  // grossisement de la lettre sur polygone id :
  document
    .getElementById("GlettrageGES" + id)
    .classList.add("displayPolynom", "frame06");

  // ajoute le lettrage
  document.getElementById("frameContentGES").classList.add("displayPolynom");
  document
    .getElementById("frameContentGES")
    .style.setProperty("transform", "translateY(" + decalage + "px");
  document.getElementById("frameContentGES").innerHTML = `
        
        <text id="indexGES2" class="valueDPE" x="98" y="13.5">${GES_index}</text>
        <text class="unitDPE" x="110.2" y="13.5">KgCO</text>
        <text class="unitDPEsub" x="114.7" y="14">2</text>
        <text class="unitDPE" x="119.5" y="13.5">/m².an</text>
            `;
}
function changeNextGraph(id) {
  for (let i = id + 1; i < 7; i++) {
    document.getElementById("LshapeGES" + i).classList.add("displayPolynom");
    document.getElementById("LlettrageGES" + i).classList.add("displayPolynom");
    document.getElementById("shapeGES" + i).classList.add("hiddenPolynom");
    document.getElementById("lettrageGES" + i).classList.add("hiddenPolynom");
  }
}
function setGraphGES(id) {
  changeGraph(id);
  changeNextGraph(id);
  document.getElementById("polygonesGES").innerHTML += `
  <text class="logementPeuEmis" x="5" y="-2">peu d'émissions de CO</text>
  <text class="logementPeuEmisInd" x="40.1" y="-1.5">2</text>
  `;
  document.getElementById("longPolygonesGES").innerHTML += `
  <text class="logementEmis" x="5" y="90">émissions de CO</text>
  <text class="logementEmisInd" x="31" y="90.5">2</text>
  <text class="logementEmis" x="5" y="94">très importantes</text>
  `;
}
console.log(calculateIndex(DPE_index, GES_index));

// affivhage DPE
setPolygon(calculateIndex(DPE_index, GES_index)[2]);

// affichage GES
graphGESDisplay(GES_index);
setGraphGES(calculateIndex(DPE_index, GES_index)[1]);

function saveScreenshot(target, scale) {
  const screenshot = document.getElementById(target);
  html2canvas(screenshot, { scale: scale }).then((canvas) => {
    document.getElementById("outputDPE").appendChild(canvas);
    let cvs = document.querySelector("canvas");
    let a = document.getElementById("download");
    a.href = cvs.toDataURL();
    a.download = "etiquetteDPE.png";
    a.click();
  });
}
saveScreenshot("sectionDPE", 9.451);

//===============================================================//
//
//             Informations complémentaires
//
//===============================================================//

// utilisation de l'objet Enum :
var myQuality = QualityEnum.MEDIUM; // ==> 2
var myResolution = QualityEnum.properties[myQuality].resolution; // ==> 150ppp
// pour figer l'objet et empêcher l'ajout, la suppression ou la modification des propriétés;
if (Object.freeze) Object.freeze(QualityEnum); // avec test car freeze n'est pas reconnu par tous les navigateurs

// méthode pour utiliser la capture d'écran
//
// 1. on récupère le fichier html2canvas.js sur github ou sur cdn:
//   "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
// 2. on ajoute dans index.html le script:
//       <script src="./html2canvas.js"></script>
// 3.

function getScreenshot(target, scale) {
  const screenshot = document.getElementById(target);
  html2canvas(screenshot, { scale: scale }).then((canvas) => {
    document.getElementById("outputDPE").appendChild(canvas);
    let cvs = document.querySelector("canvas");
    let a = document.getElementById("download");
    a.href = cvs.toDataURL();
    a.download = "etiquetteDPE.png";
    a.click;
  });
}
