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
    "7a965029e37662e55eb98423399411cf539161a909589566b9a4d71c9edf660e8944a819e16727726c4e7b0a0ba9d68f8ca60d87c13e24ca69437d4ca67e664866d93d02d6f9e5d759b9c142526838cb641323756009f059c15ad3a966949a3211346d3f7152ed7ad8bd28e96c0e1d2fb9967c2ecc2951ea88a1845f-1000525b13d0f812-fd27323d375c17fe603629fe849824bed5a4f16adddc98b0450970912fa2cf43";

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
