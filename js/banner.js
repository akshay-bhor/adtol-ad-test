import fetchAd from "./fetch";
import { randomId, isHidden } from "./util";

// create a random class
const idName = randomId(6);

// Get parent
const currScript = document.currentScript;
const parent = currScript.parentNode;

// Check if parent is hidden
if (!isHidden(parent)) {
  // Get token
  const token =
    currScript.getAttribute("id") ||
    "2f221b0b2c2d033b0bb428da68c332dd17d4b0aae30b464a1be0f08018a3f7af64c1322431049ed18929c66ad3782a3d7737809ba46767fbc7c97d2d0e94849179af60de29b4f94e6925a11bcb41764816b312c6cd4e3d057f9131e51dfe1d9412927485cef94e35e6191cc7f0c416a7ebd9febc-58431a3618b268b8-58b32157e98b338c0de1226cc0b9063b1fcbc854a1427785c4fe750ccac81c69";

  // Create element
  let childEle = document.createElement("div");
  childEle.setAttribute("id", idName);
  childEle.style.display = "inline-block";
  parent.appendChild(childEle);

  // Get ad element
  const ad_widget = document.getElementById(idName);

  // Fetch API
  fetchAd(token)
    .then((res) => {
      res = res.ads;
      let html = "";

      for (let i in res) {
        let rel = "";
        if (res[i].rel == 0) rel = " rel='nofollow'";
        if (res[i].rel == 2) rel = " rel='nofollow noreferrer noopener'";

        html += `
        <div
        style="
          position: relative;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          border: none;
          box-sizing: border-box;
          display: inline-block;
        "
      >
        <a
          target="_blank"
          style="display: inline-block"
          ${rel}
          href="${res[i].process}"
          ><img
            src="${res[i].banner}"
            alt="${res[i].title}"
            style="position: relative" /></a
        ><a target="_blank" href="https://www.adtol.com"
          ><img
            src="https://www.adtol.com/images/adchoices.svg"
            alt="ad"
            title="Ads by AdTol.com"
            style="position: absolute; top: 0; right: 0; width: 16px"
        /></a>
      </div>
        `;
      }

      ad_widget.innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}
