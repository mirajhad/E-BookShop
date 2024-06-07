var dataTable;

$(document).ready(function () {
    var url = window.location.search;
    var status = "all"; // Default status

    if (url.includes("inprogress")) {
        status = "inprogress";
    } else if (url.includes("completed")) {
        status = "completed";
    } else if (url.includes("pending")) {
        status = "pending";
    } else if (url.includes("approved")) {
        status = "approved";
    }

    loadDataTable(status);
});

function loadDataTable(status) {
    // Check if the DataTable is already initialized
    if ($.fn.DataTable.isDataTable('#tblData')) {
        $('#tblData').DataTable().destroy(); // Destroy the existing instance
    }

    // Initialize the DataTable
    dataTable = $('#tblData').DataTable({
        "ajax": {
            url: '/admin/order/getall?status=' + status,
        },
        "columns": [
            { data: 'id', "width": "5%" },
            { data: 'name', "width": "15%" },
            { data: 'phoneNumber', "width": "15%" },
            { data: 'applicationUser.email', "width": "15%" },
            { data: 'orderStatus', "width": "15%" },
            { data: 'orderTotal', "width": "15%" },
            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-75 btn-group" role="group">
                    <a href="/admin/order/details?orderId=${data}" class="btn btn-primary mx-2"><i class="bi bi-pencil-square"></i> </a>
                    </div>`;
                }
            }
        ]
    });
}
