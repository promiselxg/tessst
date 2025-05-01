import React from "react";
import Preview from "../editor/preview";

const ProductDescriptionCard = ({ description }) => {
  return (
    <>
      <div className="p-5">
        <h1 className="text-lg font-semibold ">Product Details</h1>
        <div className="w-full border-[rgba(0,0,0,0.1)] border-b-[1px] my-2" />

        {/* <ul className="space-y-2 text-sm text-[--app-primary-color] list-disc px-5">
          <li>Type: IPS LCD</li>
          <li>Aspect Ratio and PPI: 260 ppi density</li>
          <li>Size: 6.88 inches (~84.0% screen-to-body ratio)</li>
          <li>Refresh Rate: 120 Hz</li>
          <li>Resolution: 720 x 1640 pixels</li>
          <li>Peak Brightness: 120Hz, 450 nits (typ), 600 nits (HBM)</li>
          <li>Features: IPS LCD</li>
          <li>Dimensions: 171.9 x 77.8 x 8.2 mm (6.77 x 3.06 x 0.32 in)</li>
          <li>Weight: 204 / 207 / 211 g (7.20 oz)</li>
          <li>Sensors: Fingerprint (side-mounted), Accelerometer, Compass</li>
          <li>3.5mm Audio Jack: Yes</li>
          <li>NFC: (Market/Region dependent)</li>
          <li>USB: Type-C 2.0</li>
          <li>Loudspeaker: Yes</li>
          <li>SIM Card Type: Nano-SIM, Dual Stand-by</li>
          <li>Number of SIM: Dual SIM</li>
          <li>Wi-Fi: 802.11 a/b/g/n/ac, Dual-band</li>
          <li>Bluetooth: 5.4, A2DP, LE</li>
          <li>Chipset: Mediatek Helio G81 Ultra</li>
          <li>CPU: Octa-core 2.0 GHz</li>
          <li>GPU: Mali-G52 MC2</li>
          <li>OS: Android 14, HyperOS</li>
          <li>Memory: 4GB / 128GB</li>
          <li>SD Card Slot: microSDXC (Dedicated Slot)</li>
          <li>Battery Capacity: 5160 mAh</li>
          <li>Charging Type: 18W</li>
          <li>Fast Charging: Yes</li>
        </ul> */}
        <Preview value={description} />
      </div>
    </>
  );
};

export default ProductDescriptionCard;
