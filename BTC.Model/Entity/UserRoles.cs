﻿using BTC.Core.Base.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BTC.Model.Entity
{
    public class UserRoles : IEntity
    {
        public int ID { get; set; }

        public string Name { get; set; }

    }
}
