$.each(
    $('td[id^="chgRow"] div'),
    function(index, value) {
        //link strings
        var baseRelatedLink = 'http://arczone.esri.com/utilities/finder/index.cfm?';
        var relatedWbsLink = 'fa=wbs&wbs=';
        var relatedIoLink = 'fa=io&io=';
        var baseDetailsLink = 'http://pswebsp:85/pdb/ProjectOverview.asp?projnum=';
        var relatedTooltip = 'View Related Numbers';
        var detailsTooltip = 'View Project Details';
        var ignoredIds = ['BERE', 'COMP', 'JURY', 'SICK', 'VACA', 'NOPA', 'HOLI'];

        var wbs = $(value).attr('id');

        //need to skip all this if the wbs is something like vacation or holiday
        if (ignoredIds.indexOf(wbs) < 0) {
            var actionContainer = $('<span class="wbs-link-container"></span>');
            //create the links because we know we have at least some details
            var hasProjectDetails = wbs[0] === 'C';
            var projectWbs;

            //format the project id for other pages to search
            //trims the id and adds '.'
            if (hasProjectDetails) {
                projectWbs = wbs.substring(0, wbs.indexOf('A'));
                projectWbs = [projectWbs.slice(0, 1), '.', projectWbs.slice(1)].join('');
            }

            //create domNodes for details and related wbs
            if (hasProjectDetails) {
                var projectDetailsLink = baseDetailsLink + projectWbs;
                $(actionContainer).append('<a href="' + projectDetailsLink + '" target="_blank" class="wbs-link details-wbs-link" data-tooltip-text="' + detailsTooltip + '"><i class="fa fa-info-circle"></i></a>');
            }

            //now for the related wbs link
            var relatedWbsLink;
            if (hasProjectDetails) {
                relatedWbsLink = baseRelatedLink + relatedWbsLink + projectWbs;
            } else {
                relatedWbsLink = baseRelatedLink + relatedIoLink + wbs;
            }
            $(actionContainer).append('<a href="' + relatedWbsLink + '" target="_blank" class="wbs-link related-wbs-link" data-tooltip-text="' + relatedTooltip + '"><i class="fa fa-list"></i></a>');

            $(value).append(actionContainer);
        }
    }
);

var contentRows = 'form > table > tbody > tr > td > table:nth-child(0n + 4) > tbody > tr > td:last-child > table:nth-child(0n + 2) > tbody > tr';
var todaysColIndex;
//loop through the header rows and get the index for the current date
$.each(
    $(contentRows + ':nth-child(0n + 2) td'),
    function(index, value) {
      var formattedDay = ("0" + new Date().getDate()).slice(-2);
      var formmatedMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
      var formattedDate = formmatedMonth + '/' + formattedDay;

      if ($(value).find('b:first-child').html() == formattedDate) {
          //this is the current day column, use this index for adding classes to the other rows
          todaysColIndex = index + 1;
      }
    }
);
//add a class to the column for todays date
$.each(
    $(contentRows + '>td:nth-child(0n+' + todaysColIndex + ')'),
    function(index, value) {
      $(value).addClass('today-col');
    }
);

//create another menu option for overhead request
$('form > table > tbody > tr > td > table:nth-child(0n + 4) > tbody > tr > td:first-child font').last().append('<br><br><font face="arial" size="1"><a href="http://pswebsp/applications/overhead/ohmenu.aspx" target="_blank" onmouseover="window.status="Overhead Requests"; return true" onmouseout="window.status=""; return true"><font face="arial" color="blue" size="1"><b>Overhead Request</b></font></a><br><br>');

var hrefStrings = ['history', 'javascript:Vacation', 'javascript:Sick', 'javascript:bank', 'javascript:Jury', 'audit', 'javascript:Password', 'ts_summary', 'ts_query', 'ext_hrs_details', 'http://pswebsp/applications/overhead/ohmenu.aspx'];
var iconStrings = ['history', 'glass', 'frown-o', 'university', 'gavel', 'eye', 'lock', 'list-alt', 'search', 'clock-o', 'meh-o'];
$.each(hrefStrings, function(index, value) {
    var el = $('a[href^="' + value + '"] b');
    $(el).attr('class', 'menu-link link-icon-' + iconStrings[index]);
});
