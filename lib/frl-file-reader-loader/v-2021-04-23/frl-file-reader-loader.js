// copyright 2021 Theo Armour. MIT license.

const FRL = {};

FRL.init = () => {

	FRLdivMenuFileRead.innerHTML = `

<details id=detFile>

	<summary class="summary-primary gmd-1" title="View selected items">

		File Menu

		<!--
		<span class="info">
			<img class=infoImg src="https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/noun_Information_585560.svg">
			<div class="infoTooltip gmd-5">
				Helpful stuff and things be here
			</div>
		</span>
		-->

	</summary>

	<p>
		<input type=file id=FRLinpFile onchange=FRL.readFile(this); accept="*">
	</p>

	<div id=FRLdivLog></div>

</details>`;

};



FRL.readFile = function ( files ) {

	FRL.timeStart = performance.now();
	FRL.files = files;
	FRL.file = FRL.files.files[ 0 ];

	FRL.reader = new FileReader();
	FRL.reader.onprogress = FRL.onProgress;
	FRL.reader.onload = FRL.onLoad;

	FRL.reader.readAsText( FRL.file );

};



FRL.onLoad = function () {

	console.log( "file", FRL.file );

	string = FRL.reader.result;
	//console.log( "", string );

	main.innerHTML = `<iframe srcdoc="${ string }" ></iframe>`;

	FRL.setLog();

};


FRL.onProgress = function ( size = 0, note = "" ) {

	FRL.setLog();

};


FRL.setLog = () => {

	fName = FRL.file.name ? `<div class=attributeTitle >File name</span> : <span class=attributeValue >${ FRL.file.name }</div>` : "";
	fSize = FRL.file.size ? `<div class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ FRL.file.size.toLocaleString() }</div>` : "";
	fType = FRL.file.type ? `<div class=attributeTitle >Time</span>: <span class=attributeValue >${ FRL.file.type }</div>` : "";
	fModified = FRL.file.lastModifiedDate ? `<div class=attributeTitle >Last Modified</span>: <span class=attributeValue >${ FRL.file.lastModifiedDate }</div>` : "";

	const htm =
		`
		<p>
			${ fName }
			${ fSize }
			${ fType}
			${ fModified }
		</p>
	`;

	FRLdivLog.innerHTML = htm;
}