
const loader = function () {
    const table = document.getElementById('table-data');
    table.innerHTML = `<tr>
                        <td colspan="4">
                            <div class="loader"></div>
                        </td>
                    </tr>`;
};


export default loader;