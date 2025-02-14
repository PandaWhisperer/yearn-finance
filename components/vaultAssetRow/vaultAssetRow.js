import React from 'react';
import { Typography } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Skeleton from '@material-ui/lab/Skeleton';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '../../utils';
import { useRouter } from 'next/router';

import classes from './vaultAssetRow.module.css';

export default function VaultAssetRow({ vault, account }) {
  const router = useRouter();

  function handleNavigate() {
    router.push('/invest/' + vault.address);
  }

  const vaultType = vault.type === 'v2' && !vault.endorsed ? 'Exp' : vault.type;

  let vaultTypeClass = null;
  switch (vaultType) {
    case 'v1':
      vaultTypeClass = classes.vaultV1VersionContainer;
      break;
    case 'v2':
      vaultTypeClass = classes.vaultV2VersionContainer;
      break;
    case 'Exp':
      vaultTypeClass = classes.vaultExpVersionContainer;
      break;
    case 'Earn':
      vaultTypeClass = classes.vaultEarnVersionContainer;
      break;
    case 'Lockup':
      vaultTypeClass = classes.vaultLockupVersionContainer;
      break;
    default:
      vaultTypeClass = classes.vaultVersionContainer;
      break;
  }

  return (
    <TableRow
      hover
      onClick={() => {
        handleNavigate();
      }}
      tabIndex={-1}
      key={vault.symbol}
    >
      <TableCell>
        <div className={classes.vaultTitleCell}>
          <div className={classes.logo}>
            <img src={vault.icon ? vault.icon : '/tokens/unknown-logo.png'} alt="" width={30} height={30} />
          </div>
          <div className={classes.name}>
            <Typography variant="h5" className={classes.fontWeightBold}>
              {vault.displayName}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell align="right" scope="row">
        <div className={vaultTypeClass}>
          <Typography className={classes.vaultVersionText}>{vault.type === 'v2' && !vault.endorsed ? 'Exp' : vault.type}</Typography>
        </div>
      </TableCell>
      {account && account.address && (
        <TableCell align="right">
          <Typography variant="h5" className={classes.fontWeightBold}>
            {!(vault && vault.balance) && <Skeleton stlye={{ minWidth: '100px' }} />}
            {vault && vault.balance && vault.type === 'Lockup' && formatCurrency(vault.balance) + ' ' + vault.symbol}
            {vault && vault.balanceUSD && vault.type !== 'Lockup' && '$ ' + formatCurrency(vault.balanceUSD)}
          </Typography>
        </TableCell>
      )}
      {account && account.address && (
        <TableCell align="right">
          <Typography variant="h5" className={classes.fontWeightBold}>
            {!(vault && vault.tokenMetadata && vault.tokenMetadata.balance) ? (
              <Skeleton stlye={{ minWidth: '100px' }} />
            ) : (
              formatCurrency(vault.tokenMetadata.balance) + ' ' + vault.tokenMetadata.displayName
            )}
          </Typography>
        </TableCell>
      )}
      <TableCell align="right">
        <Typography variant="h5" className={classes.fontWeightBold}>
          {!vault.apy ? (
            <Skeleton stlye={{ minWidth: '100px' }} />
          ) : vault.apy.recommended ? (
            vault.apy.recommended === 'New' ? (
              'New'
            ) : (
              BigNumber(vault.apy.recommended).times(100).toFixed(2) + '%'
            )
          ) : (
            'Unknown'
          )}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
