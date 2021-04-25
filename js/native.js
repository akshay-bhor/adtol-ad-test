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
          background: #fff;
          width: 300px;
          height: 250px;
          border-radius: 2px;
          padding: 0;
          box-sizing: border-box;
          margin: 0.5rem;
          overflow: hidden;
          box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
        "
      >
        <div style="display:block;background:#ccc;width:300px;height:150px">
          <a
            target="_blank"
            style="display:flex;width:300px;height:150px;justify-content:center"
            ${rel}
            href="${res[i].process}"
            ><img
              style="height:100%;width:100%"
              src="${res[i].banner}"
              alt="${res[i].title}"
          /></a>
        </div>
        <div
          style="
            padding: 0.25rem 0.5rem;
            height: 55px;
            font-weight: 600;
            box-sizing: border-box;
            overflow: hidden;
          "
        >
          <a
            target="_blank"
            style="font-size:16px;display:inline-block;text-decoration:none;overflow:hidden;text-overflow:ellipsis;line-height:24px"
            href="${res[i].process}"
            >${res[i].title}</a
          >
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:0.25rem 0.5rem;height:45px">
          <div
            style="
              display:inline-block;
              font-size: 16px;
              color: #A0A0A0;
              max-width: 180px;
              overflow: hidden;
              font-weight:600;
            "
          >
          ${res[i].domain}
          </div>
          <div style="display:inline-block;">
            <a
              target="_blank"
              style="display:inline-block"
              ${rel}
              href="${res[i].process}"
              ><button
                style="
                  background: #4d4dff;
                  border:none;
                  color:#fff;
                  font-weight:600;
                  border-radius: 4px;
                  padding: 8px 16px;
                  cursor:pointer;
                  box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
                "
              >
              ${res[i].btn}
              </button></a
            >
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
