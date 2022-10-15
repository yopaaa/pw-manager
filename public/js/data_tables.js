
const tableTemplate = (data) => {
  let { create_time, email, id, password, site, user_name, last_edited } = data;

  let userName = user_name.substr(0, 10);
  let Site = site.substr(0, 10);
  let lastEdited;
  if (last_edited) {
    lastEdited = '$';
  } else {
    lastEdited = "";
  }

  return `<tr style="border-bottom: 1px solid #ddd">
  
                <td onclick="hello('test')"> 
                  <span style="color:red;">${lastEdited}</span>
                  <span>${create_time}</span>
                </td>
  
                <td>${userName}</td>

                <td><a href="https://${site}" target="_blank">${Site}...</a></td>
  
                <td>
                  <input type="text" value="${email}" class="out_data" readonly />
                </td>
  
                <td>
                  <input type="text" value="${password}" class="out_data" readonly
                  />
                </td>
  
                <td>
                  <a href="/actions/edit?id=${id}">Edit</a> |
                  <a href="/Actions/delete?id=${id}" onclick="confirm('you want to delete this')">Del</a>
                </td>
  
              </tr>`;
};

const htmlTable = document.querySelector(".data-table");

fetchApi("http://0.0.0.0:40100/api", (datas) => {
  let data = datas.reverse()
  let dataTable = "";

  data.forEach((data) => {
    dataTable += tableTemplate(data);
  });

  htmlTable.innerHTML = dataTable;
});