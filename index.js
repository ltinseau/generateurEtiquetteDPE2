let DPE_index = 0;
let GES_index = 0;
let qualityChoice = 0;
let fieldsControl = [false, false, false];

const contents = {
  sectionDPE: `
  <svg
            id="svgDPE"
            width="400"
            height="400"
            style="background: white"
            viewBox="0 -10 140 105"
          >
    <g id="polygonesDPE"></g>
    <g id="grosPolygonesDPE"></g>
    <g id="longPolygonesDPE"></g>
    <g id="lettragesDPE" class="lettrage"></g>
    <g id="grownLettragesDPE" class="lettrageG"></g>
    <g id="longLettragesDPE" class="lettrage"></g>
    <g id="indexFrame"></g>
    <g id="frameContentDPE" fill-opacity="0"></g>
  </svg>
  `,
  sectionGES: `
  <svg
    id="svgGES"
    width="400"
    height="400"
    style="background: white"
    viewBox="0 -10 140 105"
  >
    <g id="polygonesGES"></g>
    <g id="grosPolygonesGES"></g>
    <g id="longPolygonesGES"></g>
    <g id="lettragesGES" class="lettrage"></g>
    <g id="grownLettragesGES" class="lettrageG"></g>
    <g id="longLettragesGES" class="lettrage"></g>
    <g id="indexLine"></g>
    <g id="frameContentGES" fill-opacity="0.5"></g>
</svg>
`,
  formulaireDPE: `
    <form class="formulaire" method="Post" action="">
      <fieldset id="fieldsetDPE">
        <p style="text-align: center">Note DPE :</p>
        <input
          type="number"
          name="DPEindex"
          id="DPEindex"
          placeholder="0"
        />
      </fieldset>
    </form>`,
  formulaireGES: `
    <form class="formulaire" method="Post" action="">
      <fieldset id="fieldsetGES">
        <p style="text-align: center">Note GES :</p>
        <input
          type="number"
          name="GESindex"
          id="GESindex"
          placeholder="0"
        />
      </fieldset>
    </form>`,
  formulaireRsl: `
    <form class="formulaire" name="mainForm" method="post" action="traitement.php">
      <fieldset>
        <p> Choix de la résolution :</p>
        <p id="resolutionForm"></p>
      </fieldset>
    </form>`,
  formulaireBtn: `
    <form class="formulaire">
      <fieldset>
        <p id="downloadTxt"> Lancer le téléchargement :<br /> </p>
        <p>
          <a id="downloadDPE" href=""></a>
          <button type="button" class="Btn" id="buttonDPE">DPE</button>
        </p>
        <p>
          <a id="downloadGES" href=""></a>
          <button type="button" class="Btn" id="buttonGES">GES</button>
        </p>
      </fieldset>
    </form>`,
};

const QualityEnum = {
  HD: 1,
  excellente: 2,
  standard: 3,
  faible: 4,
  properties: {
    1: {
      value: 1,
      name: "HD",
      resolution: "600dpi",
      size: "480 Ko",
      scale: 9.451,
    },
    2: {
      value: 2,
      name: "excellente",
      resolution: "300dpi",
      size: "170 Ko",
      scale: 4.726,
    },
    3: {
      value: 3,
      name: "standard",
      resolution: "150dpi",
      size: "65 Ko",
      scale: 2.363,
    },
    4: {
      value: 4,
      name: "faible",
      resolution: "75dpi",
      size: "25 Ko",
      scale: 1.182,
    },
  },
};
if (Object.freeze) Object.freeze(QualityEnum);

const sectionDPE = document.getElementById("sectionDPE");
const sectionGES = document.getElementById("sectionGES");

function HTMLDisplay(containt, placeID) {
  document.getElementById(placeID).innerHTML = containt;
}

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

//-------------------------------------------------------------------//
//      Etiquette DPE
//-------------------------------------------------------------------//

function graphDPEDisplay() {
  HTMLDisplay(contents.sectionDPE, "sectionDPE");

  for (i = 0; i < 7; i++) {
    document.getElementById("polygonesDPE").innerHTML += `
              <path
                id="polynome${i}"
                fill="var(--color-DPE${i + 1})"
                fill-opacity="1"
                d="M50 ${11 * i} h ${18 + 8.876 * i} l 4.034 5 -4.034 5 h -${
      18 + 8.876 * i
    } Z"
    ></path>
      `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("grosPolygonesDPE").innerHTML += `
          <path
            id="Gpolynome${i}"
            fill="var(--color-DPE${i + 1})"
            fill-opacity="0"
            d="M50 ${11 * i} h ${18 + 8.876 * i} l 8.069 10 -8.069 10 h -${
      18 + 8.876 * i
    } Z"
    ></path>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("longPolygonesDPE").innerHTML += `
          <path
            id="Lpolynome${i}"
            fill="var(--color-DPE${i + 1})"
            fill-opacity="0"
            d="M50 ${10 + 11 * i} h ${
      18 + 8.069 + 8.876 * i
    } l 4.034 5 -4.034 5 h -${18 + 8.069 + 8.876 * i} Z"
    ></path>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("lettragesDPE").innerHTML += `
        <text id="lettrage${i}" x="52.5" y="${8.5 + 11 * i}">&#${65 + i}</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("grownLettragesDPE").innerHTML += `
        <text id="lettrageG${i}" x="52.5" y="${
      16.5 + 11 * i
    }" fill-opacity="0">&#${65 + i}</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("longLettragesDPE").innerHTML += `
        <text id="lettrageL${i}" x="52.5" y="${
      18.5 + 11 * i
    }" fill-opacity="0">&#${65 + i}</text>
  `;
  }
  for (i = 0; i < 7; i++) {
    document.getElementById("indexFrame").innerHTML += `
      <path
        id="indexFrame${i}"
        fill-opacity="0"
        d="M 10 ${
          11 * i
        } h 40 v 20 h -40 q -1.5 0 -1.5 -1.5 v -17 q 0 -1.5 1.5 -1.5 Z M 30 ${
      i * 11 + 1.5
    } 30 ${i * 11 + 18.5}"
  ></path>
  `;
  }
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
        <text class="unitDPE" x="40" y="15">KgCO&#8322;/m².an</text>
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

// affichage DPE
HTMLDisplay(contents.formulaireDPE, "formulaireDPE");
graphDPEDisplay();
setPolygon(calculateIndex(DPE_index, GES_index)[2]);

//-------------------------------------------------------------------//
//      Etiquette GES
//-------------------------------------------------------------------//

function graphGESDisplay() {
  HTMLDisplay(contents.sectionGES, "sectionGES");

  for (i = 0; i < 7; i++) {
    document.getElementById("polygonesGES").innerHTML += `
          <path
            id="shapeGES${i}"
            fill="var(--color-GES${i + 1})"
            fill-opacity="1"
            d="M5 ${11 * i} h ${13 + 8.876 * i} q 5 0 5 5 0 5 -5 5 h -${
      13 + 8.876 * i
    } Z"
    ></path>
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
    ></path>
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
    ></path>
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
        stroke="white"
        stroke-width="1"
        fill-opacity="0.5"
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
        <text class="unitDPE" x="116" y="13.5">KgCO&#8322/m².an</text>
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

// affichage GES
HTMLDisplay(contents.formulaireGES, "formulaireGES");
graphGESDisplay();
setGraphGES(calculateIndex(DPE_index, GES_index)[1]);

//===============================================================//
//
//             contrôle des champs DPE et GES
//
//===============================================================//

// fonction de contrôle qui va vérifier:
// - si les valeurs ont été modifiées
//
// fonction alertDisplay, DE= "DPE" ou "GES"
function alertDisplay(element) {
  var fieldsetDPE = document.getElementById("fieldsetDPE");
  var fieldsetGES = document.getElementById("fieldsetGES");
  var timeoutID;

  if (element == "DPE") {
    fieldsetDPE.classList.add("alertColor");
    document.getElementById("DPEindex").classList.add("alertField");
  }
  if (element == "GES") {
    fieldsetGES.classList.add("alertColor");
    document.getElementById("GESindex").classList.add("alertField");
  }

  timeoutID = window.setTimeout(() => {
    fieldsetDPE.classList.remove("alertColor");
    document.getElementById("DPEindex").classList.remove("alertField");
  }, 800);
  timeoutID = window.setTimeout(() => {
    fieldsetGES.classList.remove("alertColor");
    document.getElementById("GESindex").classList.remove("alertField");
  }, 800);
}

//===============================================================//
//
//             Mise à jour automatique des étiquettes
//
//===============================================================//

const fieldDPE = document.getElementById("DPEindex");
fieldDPE.addEventListener("input", (e) => {
  DPE_index = e.target.value;
  console.log("DPE = " + DPE_index);
  console.log(calculateIndex(DPE_index, GES_index));
  graphDPEDisplay(calculateIndex(DPE_index, GES_index)[2]);
  setPolygon(calculateIndex(DPE_index, GES_index)[2]);
  graphGESDisplay(GES_index);
  setGraphGES(calculateIndex(DPE_index, GES_index)[1]);
  // mise à jour contrôle des champs:
  DPE_index == "" || DPE_index - Math.abs(Math.round(DPE_index)) != 0
    ? (fieldsControl[0] = false)
    : (fieldsControl[0] = true);
  fieldsControl[2] = fieldsControl[0] && fieldsControl[1];
  // console.log(fieldsControl[2]);
});

const fieldGES = document.getElementById("GESindex");
fieldGES.addEventListener("input", (e) => {
  GES_index = e.target.value;
  console.log("GES = " + GES_index);
  console.log(calculateIndex(DPE_index, GES_index)[2]);
  graphDPEDisplay(calculateIndex(DPE_index, GES_index)[2]);
  setPolygon(calculateIndex(DPE_index, GES_index)[2]);
  graphGESDisplay(GES_index);
  setGraphGES(calculateIndex(DPE_index, GES_index)[1]);
  // mise à jour contrôle des champs:
  GES_index == "" || GES_index - Math.abs(Math.round(GES_index)) != 0
    ? (fieldsControl[1] = false)
    : (fieldsControl[1] = true);
  fieldsControl[2] = fieldsControl[0] && fieldsControl[1];
  // console.log(fieldsControl[2]);
});

//===============================================================//
//
//             Boutons pour le téléchargement des étiquettes
//
//===============================================================//

// fonction pour afficher le formulaire (sans la liste des résolutions)
// function mainFormulaireDisplay(element) {
//   document.getElementById(element).innerHTML = `
//     <form class="formulaire" name="mainForm" method="post" action="traitement.php">
//       <fieldset>

//         <p id="resolutionForm">
//           <!-- resolutionListDisplay() -->
//         </p>
//       </fieldset>
//     </form>
//     <form class="boutons">
//       <p> Lancer le téléchargement :<br /> </p>
//       <div>
//         <a id="downloadDPE" href=""></a>
//         <button type="button" class="Btn" id="buttonDPE">DPE</button>
//         <a id="downloadGES" href=""></a>
//         <button type="button" class="Btn" id="buttonGES">GES</button>
//       </div>
//     </form>
//   `;
// }

// fonction pour afficher les résolutions (avec un selecteur en DE et la résolution par défaut)
function resolutionListDisplay(element, defaut) {
  for (i = 1; i <= 4; i++) {
    var quality = QualityEnum.properties[i];
    // input avec coche par défaut (checked)
    function inputDefault() {
      document.getElementById(element).innerHTML += `
    <input
      type="radio"
      name="resolution"
      value="${quality.scale}"
      id="${quality.resolution}"
      checked
  />`;
      qualityChoice = quality.scale;
    }
    quality.name == defaut
      ? inputDefault()
      : (document.getElementById(element).innerHTML += `
      <input
        type="radio"
        name="resolution"
        value="${quality.scale}"
        id="${quality.resolution}"
    />`);
    // label :
    document.getElementById(element).innerHTML += `
    <label for= ${quality.resolution}> ${quality.name} <span style="font-style:italic"> &nbsp; &nbsp;  &#10137;  &nbsp;  ${quality.resolution} (<${quality.size})</span> </label><br />
    `;
  }
}

//mainFormulaireDisplay("formulaire");

HTMLDisplay(contents.formulaireRsl, "formulaireRsl");
resolutionListDisplay("resolutionForm", "standard");
HTMLDisplay(contents.formulaireBtn, "formulaireBtn");

const cbs = document.querySelectorAll("input[name=label]");

cbs.forEach((cb) => {
  cb.addEventListener("change", function () {
    if (this.checked) {
      console.log(`Checkbox ${this.id} is checked..`);
    } else {
      console.log(`Checkbox ${this.id} is not checked..`);
    }
  });
});

var radios = document.forms["mainForm"].elements["resolution"];
for (var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function () {
    qualityChoice = this.value;
  };
}

//===============================================================//
//
//             Capture du graphique
//
//===============================================================//

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

// saveScreenshot("sectionDPE", qualityChoice);

//===============================================================//
//
//             téléchargement des étiquettes
//
//===============================================================//

document.getElementById("buttonDPE").addEventListener("click", (e) => {
  e.preventDefault();
  let screenshot = document.getElementById("sectionDPE");
  if (fieldsControl[2]) {
    html2canvas(screenshot, { scale: qualityChoice }).then((canvas) => {
      document.getElementById("outputDPE").replaceChild(canvas, canvasDPE);
      canvas.id = "canvasDPE";
      // édition du fichier DPE.png à partir du contenu du canvas:
      let cvs = document.getElementById("canvasDPE");
      let a = document.getElementById("DPElink");
      a.href = cvs.toDataURL();
      a.download = "DPE.png";
      a.click();
    });
  } else {
    !fieldsControl[0] ? alertDisplay("DPE") : () => {};
    !fieldsControl[1] ? alertDisplay("GES") : () => {};
  }
});

document.getElementById("buttonGES").addEventListener("click", (e) => {
  e.preventDefault();
  let screenshot = document.getElementById("sectionGES");
  if (fieldsControl[1]) {
    html2canvas(screenshot, { scale: qualityChoice }).then((canvas) => {
      document.getElementById("outputGES").replaceChild(canvas, canvasGES);
      canvas.id = "canvasGES";
      // édition du fichier GES.png à partir du contenu du canvas:
      let cvs2 = document.getElementById("canvasGES");
      let a = document.getElementById("GESlink");
      a.href = cvs2.toDataURL();
      a.download = "GES.png";
      a.click();
    });
  } else {
    alertDisplay("GES");
  }
});
