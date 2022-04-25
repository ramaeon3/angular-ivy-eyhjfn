import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CellClickedEvent,
  CellDoubleClickedEvent,
  ColDef,
  Column,
  ColumnApi,
  ColumnMovedEvent,
  DragStoppedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
  <ag-grid-angular
  style="width: 1500px; height: 750px; padding-top: 10px;"
  class="ag-theme-alpine"
  [columnDefs]="columnDefs"
  (gridReady)="onGridReady($event)"
  [rowDragManaged]="true"
  [gridOptions]="gridOptions"
  [rowData]="rowData"
>
</ag-grid-angular>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private gridColumnApi!: ColumnApi;
  rowData!: any[];

  columnDefs: ColDef[] = [
    { field: 'athlete', headerName: 'SVID Name' },
    { field: 'age', sortable: true, filter: true },
    { field: 'country', sortable: true, filter: true },
    { field: 'sport', sortable: true, filter: true },
    { field: 'year', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'gold', sortable: true, filter: true },
    { field: 'silver', sortable: true, filter: true },
    { field: 'bronze', sortable: true, filter: true },
    { field: 'total', sortable: true, filter: true },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  gridOptions: GridOptions = {
    onCellDoubleClicked: (event: CellDoubleClickedEvent) =>
      console.log('Cell was clicked'),

    onDragStopped: (event: DragStoppedEvent) => this.test(event),

    onColumnMoved: (event: ColumnMovedEvent) => this.test2(event),
  };

  test2(params) {
    //  console.log(params);
    // let columnState = params.columnApi.getColumnState();
    // console.log(columnState, "columnState")
  }

  // onColumnMoved(params) {
  //   let columnState = JSON.stringify(params.columnApi.getColumnState());
  //   localStorage.setItem('myColumnState', columnState);
  //   console.log(columnState, "columnState")
  // }

  test(params) {
    // console.log(params);
    // const colIds = params.columnApi.getAllDisplayedColumns().map(col => col.colId)
    //   console.log(colIds)

    //   const colIds2 = params.columnApi.getAllGridColumns().map(col => col.colId)
    //   console.log(colIds2)

    //   const colIds3 = params.columnApi.columnModel.columnDefs;
    //   console.log(colIds3)

    //   const colIds4 = params.columnApi.getAllColumns()
    //   console.log(colIds4)
    let columnDragState = params.columnApi.getColumnState();
    //console.log(columnDragState, 'columnDragState');
    const colIds = params.columnApi.getAllDisplayedColumns().map((e) => {
      return e.colDef;
    });
    //console.log(colIds);

    let arr3 = colIds.map((item, i) =>
      Object.assign({}, item, columnDragState[i])
    );
    console.log(arr3);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
