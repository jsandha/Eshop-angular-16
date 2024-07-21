import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';

import { Injectable } from '@angular/core';
import { ShopActions } from './shop';
import { Store } from '@ngrx/store';

@Injectable()
export class ShopEffects {
  //   loadCount = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(ShopActions.),
  //       switchMap(() => {
  //         const count = localStorage.getItem('count');
  //         return of(CounterActions.set({ payload: count ? count : 0 }));
  //       })
  //     )
  //   );

  //   saveCount = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(CounterActions.increment, CounterActions.decrement),
  //         withLatestFrom(this.store.select(CounterSelectors.selectValue)),
  //         tap(([action, counter]) =>
  //           localStorage.setItem('count', counter.toString())
  //         )
  //       ),
  //     { dispatch: false }
  //   );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}
}
