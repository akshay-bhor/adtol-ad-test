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
    "2f221b0b2c2d033b0bb428da68c332dd17d4b0aae30b464a1be0f08018a3f7af64c1322431049ed18929c66ad3782a3d7737809ba46767fbc7c97d2d0e94849179af60cd36b4a1156d39f344cb1a304a1db41880844e7043418117e101ac4284048439c3f0ff7039e91200fdf1f21fabb386edfb1807-58431a3618b268b8-681dd7cc36f6f72b35005c016e22914254348f5eda3755b60ee1816b646cd9f8";

  // Create element
  let childEle = document.createElement("div");
  childEle.setAttribute("id", idName);
  parent.appendChild(childEle);

  // Get ad element
  const ad_widget = document.getElementById(idName);

  let html = "";
  html += `<style>
  .adtol-feed-ad-container{display:flex;justify-content:space-around;flex-basis:320px;flex-direction:row;flex-wrap:wrap}
  @media(min-width:767px){.adtol-feed-ad-container{justify-content:left}}
  </style>`;
  childEle.setAttribute("class", 'adtol-feed-ad-container');

  // Fetch API
  fetchAd(token)
    .then((res) => {
      res = res.ads;

      for (let i in res) {
        let rel = "";
        if (res[i].rel == 0) rel = " rel='nofollow'";
        if (res[i].rel == 2) rel = " rel='nofollow noreferrer noopener'";

        html += `
        <div style="background:none!important;padding:0.5em;box-sizing:border-box">
        <div style="display:inline-block;width:320px;height:250px;overflow:hidden">
          <a target="_blank"
            style="display:block"
            ${rel}
            href="${res[i].process}"
            ><div style="position:relative;display:block">
              <img
                style="width:100%;height:175px"
                src="${res[i].banner}"
                alt="${res[i].title}"
              />
              <a target="_blank" href="https://www.adtol.com">
                <img
                    src="https://www.adtol.com/images/adchoices.svg"
                    alt="ad"
                    title="Ads by AdTol.com"
                    style="position: absolute; top: 0; right: 0; width: 16px"
                /></a>
            </div>
          </a>
          <div style="display:block">
            <a style="display:inline-block;text-decoration:none!important;overflow:hidden;text-overflow:ellipsis;line-height:24px;height:48px"
              ${rel}
              target="_blank"
              href="${res[i].process}"
              >${res[i].title}</a
            >
            <div style="color:#a0a0a0;font-weight:600;font-size:90%">${res[i].domain}</div>
          </div>
        </div>
      </div>
        `;
      }

      ad_widget.innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}
