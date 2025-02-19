﻿using BTC.Core.Base.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BTC.Model.Entity
{
    public class PasswordChangeMails : IEntity
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public string ChangeUrl { get; set; }

        public bool IsUsed { get; set; }

        public Guid ChangeGuid { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
