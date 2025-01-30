import os from 'os';
import { NetworkInfo } from 'react-native-network-info';



export async function getLocalIPv4Address(): Promise<string | null> {
    try {
        const ipAddress = await NetworkInfo.getIPAddress();
        return ipAddress;
    } catch (error) {
        console.error('Error getting IP address:', error);
        return null;
    }
}