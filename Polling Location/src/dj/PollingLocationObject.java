package dj;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
/**
 * This class parses and returns polling location information
 * @author julianbrown
 *
 */
public class PollingLocationObject {
	private JSONObject pollingObject;
	
	/**
	 * Initial constructor with json string
	 * @param jsonString
	 */
	public PollingLocationObject(String jsonString){
		JSONObject jsonObject = new JSONObject(jsonString);
        this.pollingObject = (JSONObject)jsonObject.getJSONArray("pollingLocations").getJSONObject(0);
	}
	
	/**
	 * Use JSONObject to store and return polling address 
	 * @return Hash Map
	 */
	public HashMap<String, String> getLocationInfo(){
		HashMap<String, String> hm = new HashMap<String, String>();
       
        JSONObject addressObj = (JSONObject) this.pollingObject.get("address");
        
        //POLLING HOURS AND SOURCES
        hm.put("pollingHours",(String) pollingObject.get("pollingHours"));
        hm.put("notes",(String) pollingObject.get("notes") );
       
        
        //ADDRESS
        hm.put("locationName", addressObj.getString("locationName"));
        hm.put("street", addressObj.getString("line1"));
        hm.put("city", addressObj.getString("city"));
        hm.put("state", addressObj.getString("state"));
        hm.put("zip", addressObj.getString("zip"));
		return hm;
	}
	
	/**
	 * Use JSONObject to store and return polling sources
	 * @return Array
	 */
	public LocationSource [] getLocationSource(){
		
		//SOURCE
        JSONArray sourceArray = this.pollingObject.getJSONArray("sources");
        LocationSource [] pollingSourceArray = new LocationSource[sourceArray.length()];
        //System.out.println(sourceArray.length());
        for (int i = 0; i < sourceArray.length(); i++) {
        	pollingSourceArray[i] = new LocationSource();
        	pollingSourceArray[i].sourceName = (String)sourceArray.getJSONObject(i).get("name");
        	pollingSourceArray[i].officail = (Boolean)sourceArray.getJSONObject(i).get("official");
        	
		}
        return pollingSourceArray;
	}
	
}
