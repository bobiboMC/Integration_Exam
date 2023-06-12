function convertToHebrew() {
    let gregorianDate = document.getElementById('gregorianDate').value;
    let validDate=isValidDate(gregorianDate);
    if(!validDate)
        document.getElementById('hebrewDate').textContent = "Not Valid Date!";
    else{
        let apiUrl = 'https://www.hebcal.com/converter?cfg=json&date=' + gregorianDate + '&g2h=1&strict=1';

        let xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let hebrewDate = response.hebrew;
            document.getElementById('hebrewDate').textContent = hebrewDate;
          }
        };
        xhr.send();
    }
  }

  function isValidDate(dateString) {
    let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!dateRegex.test(dateString)) {
      return false; // Invalid format
    }
  
    let parts = dateString.split('-');
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let day = parseInt(parts[2]);
  
    // Validate year, month, and day ranges
    if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }
  
    // Check for specific month and day ranges
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
      return false; // April, June, September, and November have 30 days
    } else if (month === 2) {
      if (day > 29) {
        return false; // February has 29 days at most
      } else if (day === 29 && !isLeapYear(year)) {
        return false; // February 29th is valid only in leap years
      }
    }
  
    return true; // Valid date
  }
  
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  
  
  
  
  
  
  
  


  
