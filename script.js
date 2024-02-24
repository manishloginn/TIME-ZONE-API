
navigator.geolocation.getCurrentPosition(position => {
    var requestOptions = {
        method: 'GET',
      };
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
 
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=b221aa5cf471413f9671db116797d760`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.features && data.features.length > 0) {
          console.log(data);
            const locationInfo = data.features[0].properties;
            const timezone = locationInfo.timezone.name;
            const latitude = locationInfo.lat;
            const longitude = locationInfo.lon;
            const offsetSTD = locationInfo.timezone.offset_STD;
            const offsetSTDSeconds = locationInfo.timezone.offset_STD_seconds;
            const offsetDST = locationInfo.timezone.offset_DST;
            const offsetDSTSeconds = locationInfo.timezone.offset_DST_seconds;
            const country = locationInfo.country;
            const postcode = locationInfo.postcode;
            
            const city = locationInfo.state;

         
            document.getElementById('Current-time').innerHTML = `
            <div class="result2">
            <h1>TimeZone API <br> Your Current Time Zone</h1>
            <div>
                <p>Name Of Time Zone : ${timezone}</p>
                <div class="insidediv">
                    <p>Lat: ${latitude}</p>
                    <p>Long: ${longitude}</p>
                </div>
                <p>Offset STD: ${offsetSTD}</p>
                <p>Offset STD Seconds : ${offsetSTDSeconds}</p>
                <p>Offset DST : ${offsetDST}</p>
                <p>Offset DST Seconds: ${offsetDSTSeconds}</p>
                <p>Country: ${country}</p>
                <p>Postcode: ${postcode}</p>
                <p>City: ${city}</p>
            </div>
        </div>`;
        } else {
            console.error('No location found for the given city.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, error => {
    console.error('Error getting current position:', error);
  });





function getLocationInformation() {
    const city = document.getElementById('city').value;
    var requestOptions = {
        method: 'GET',
      };

      if (!city) {
        document.getElementById('result').innerHTML =`  <P style="color: red;">Please enter an address!</P>`
      }
      
      fetch(`https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=b221aa5cf471413f9671db116797d760`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.features && data.features.length > 0) {
                const locationInfo = data.features[0].properties;
                const timezone = locationInfo.timezone.name;
                const latitude = locationInfo.lat;
                const longitude = locationInfo.lon;
                const offsetSTD = locationInfo.timezone.offset_STD;
                const offsetSTDSeconds = locationInfo.timezone.offset_STD_seconds;
                const offsetDST = locationInfo.timezone.offset_DST;
                const offsetDSTSeconds = locationInfo.timezone.offset_DST_seconds;
                const country = locationInfo.country;
                const postcode = locationInfo.postcode;
                const city = locationInfo.state;

                // Update the DOM with location information
                document.getElementById('result').innerHTML = `
                <div class="result2">
                <h1>Your result</h1>
                <div>
                    <p>Name Of Time Zone : ${timezone}</p>
                    <div class="insidediv">
                        <p>Lat: ${latitude}</p>
                        <p>Long: ${longitude}</p>
                    </div>
                    <p>Offset STD: ${offsetSTD}</p>
                    <p>Offset STD Seconds : ${offsetSTDSeconds}</p>
                    <p>Offset DST : ${offsetDST}</p>
                    <p>Offset DST Seconds: ${offsetDSTSeconds}</p>
                    <p>Country: ${country}</p>
                    <p>Postcode: ${postcode}</p>
                    <p>City: ${city}</p>
                </div>
            </div>`;
            } else {
                console.error('No location found for the given city.');
            }
        })
        .catch(error => {
            console.error('Error fetching location information:', error);
        });

       
}
