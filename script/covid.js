var COVID = COVID || {};

$(document).ready(function() {
    COVID.buildBasicTable();
});

COVID.buildBasicTable = function() {
    var nutsUrl = "https://services6.arcgis.com/swIsfiMN39u9wKrT/ArcGIS/rest/services/NUTS/FeatureServer/2/query?where=NUTS0%3D%27DE%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Date%2CNAME%2CDaily_New%2CTotal_New%2CDaily_Deaths%2CTotal_Deaths%2CDaily_Recovered%2CTotal_Recovered&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";
    $.getJSON(nutsUrl, function(data) {
        var $table = $('#nutsBasicTable')

        var sortedData = $(data.features).sort(function(a, b) {
            var textA = a.attributes.NAME.toLowerCase();
            var textB = b.attributes.NAME.toLowerCase();

            if (textA < textB) {
                return -1;
            } if (textA > textB) {
                return 1;
            }
            return 0; 
        });

        $(sortedData).each(function (index, val) {
            var $tr = $("<tr></tr>");
            //var $date = new Date(val.attributes.Date).toISOString().slice(0,10);

            //$tr.append("<td>" + $date + "</td>");
            $tr.append("<td>" + val.attributes.NAME + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Daily_New + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Total_New + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Daily_Deaths + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Total_Deaths + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Daily_Recovered + "</td>");
            $tr.append("<td style='text-align:right'>" + val.attributes.Total_Recovered + "</td>");
            
            $table.append($tr);
        });

        $table.show();
    });
};