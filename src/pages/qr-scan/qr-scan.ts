import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemindcardPage } from '../remindcard/remindcard';
declare var require: any;



/**
 * Generated class for the QrScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage {
  scanFormat: string;
  card_id: string;
  studentArray = [];
  term = '';
  qrId = '';
  data: Observable<any>;

  dateFormat = require('dateformat');
  date = this.dateFormat(new Date(), "yyyy-mm-dd");
  time = this.dateFormat(new Date(), "HH:MM:ss");


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private barcodeScanner: BarcodeScanner) {
    this.loadstudentcheckData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrScanPage');
  }


  loadstudentcheckData() {
    let url = "http://192.168.1.72/servicephp/testsick.php";
    // let url = "http://192.168.1.4/servicephp/testsick.php";
    this.http.get(url).subscribe((data: any) => {
      this.term = data.term;
    }, (error) => { console.log(error) });

  }

  barcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.card_id = barcodeData.text;
      let url = 'http://192.168.1.72/servicephp/getqrcodescan.php?card_id=' + barcodeData.text;
      // let url = 'http://192.168.1.4/servicephp/getqrcodescan.php?card_id=' +barcodeData.text;
      this.http.get(url).subscribe((data: any) => {
        this.studentArray = data.student;
        console.log(this.studentArray);

      }, (error) => { console.log(error) });
      this.scanFormat = barcodeData.format;
    }).catch(err => {
      console.log('Error', err);
    });

  }

  postJsonData(card_id, term_id, date, time, qrId) {
    let jsonData = { card_id: card_id, term_id: term_id, date: date, time: time, qrId: qrId }; //สร้าง obj
    console.log(jsonData);
    let url = 'http://192.168.1.72/servicephp/saverabsong.php?card_id=' + card_id + '&date=' + date + '&time=' + time + '&qrId=' + qrId;
    // let url = 'http://192.168.1.4/servicephp/saverabsong.php?card_id='+card_id +'&date='+date+'&time='+time+'&term_id='+term_id;
    this.http.post(url, jsonData).subscribe((data: any) => {
      console.log(url);
      alert("บันทึกเรียบร้อยแล้ว");
      this.navCtrl.push(QrScanPage)
      console.log(data);
    }
    );
  }

  remind() {
    this.navCtrl.push(RemindcardPage)
  }

}//end class
